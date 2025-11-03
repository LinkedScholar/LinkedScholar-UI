import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RootState, AppDispatch } from "../redux/store";
import { fetchSession, logout } from "../redux/authSlice";
import MiniSearcher from "./MiniSearcher";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/components/navbar.scss";

interface NavbarProps {
    clientId: string;
}

const Navbar: React.FC<NavbarProps> = ({ clientId }) => {
    const { authenticated, status, attempts } = useSelector(
        (state: RootState) => state.auth
    );

    const dispatch: AppDispatch = useDispatch();
    const [productsDropdownOpen, setProductsDropdownOpen] = useState(false);
    const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
    const [resourcesDropdownOpen, setResourcesDropdownOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();
    const isNetworkPage = location.pathname === "/network";
    const navigate = useNavigate();

    // Handle scroll effect for navbar
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setMobileOpen(false);
        setProductsDropdownOpen(false);
        setSolutionsDropdownOpen(false);
        setResourcesDropdownOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (status === "idle" && attempts === 0) {
            dispatch(fetchSession());
        }
    }, [dispatch, status, attempts]);

    // Close mobile menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (mobileOpen && !target.closest('.navbar')) {
                setMobileOpen(false);
            }
        };

        if (mobileOpen) {
            document.addEventListener('click', handleClickOutside);
            // Lock body scroll on mobile
            document.body.classList.add('menu-open');
        } else {
            // Unlock body scroll
            document.body.classList.remove('menu-open');
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
            document.body.classList.remove('menu-open');
        };
    }, [mobileOpen]);

    const handleLogout = async () => {
        const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:8080";
        try {
            await fetch(`${baseUrl}/api/user/logout`, {
                method: "POST",
                credentials: "include",
            });
            dispatch(logout());
            navigate("/");
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const handleNavigation = (href: string, closeDropdown: () => void) => {
        const targetId = href.substring(1);
        const el = document.getElementById(targetId);

        if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (window.location.pathname !== "/") {
            navigate("/" + href);
        }

        closeDropdown();
        setMobileOpen(false);
    };

    const toggleProductsDropdown = () => {
        setProductsDropdownOpen(!productsDropdownOpen);
        setSolutionsDropdownOpen(false);
        setResourcesDropdownOpen(false);
    };

    const toggleSolutionsDropdown = () => {
        setSolutionsDropdownOpen(!solutionsDropdownOpen);
        setProductsDropdownOpen(false);
        setResourcesDropdownOpen(false);
    };

    const toggleResourcesDropdown = () => {
        setResourcesDropdownOpen(!resourcesDropdownOpen);
        setProductsDropdownOpen(false);
        setSolutionsDropdownOpen(false);
    };

    const showSignIn = !authenticated && status !== "loading";

    const productsItems = [
        {
            title: "Data Fusion Suite",
            href: "#data-fusion",
            icon: "mdi-pipe",
            description: "Seamless integration pipelines for research data"
        },
        {
            title: "Visual Intelligence",
            href: "#visual-intelligence",
            icon: "mdi-chart-box",
            description: "Interactive dashboards for deep insights"
        },
        {
            title: "Institutional Agents",
            href: "#institutional-agents",
            icon: "mdi-account-network",
            description: "AI-powered research assistants"
        },
        {
            title: "Research Pulse",
            href: "#research-pulse",
            icon: "mdi-book-search",
            description: "Track breakthrough scientific literature in real-time"
        },
        {
            title: "Tech Radar",
            href: "#tech-radar",
            icon: "mdi-radar",
            description: "Discover emerging technologies and trends early"
        },
        {
            title: "Funding Detector",
            href: "#funding-detector",
            icon: "mdi-cash-multiple",
            description: "Discover funding opportunities automatically"
        },
        {
            title: "Patent Intelligence",
            href: "#patent-intelligence",
            icon: "mdi-file-certificate",
            description: "Track and analyze patent landscapes"
        },
        {
            title: "Innovation Assessment",
            href: "#innovation-assessment",
            icon: "mdi-lightbulb-on",
            description: "Measure and benchmark innovation impact"
        },
        {
            title: "Project Flow Tracker",
            href: "#project-flow-tracker",
            icon: "mdi-timeline-text",
            description: "Monitor research projects before they become startups"
        },
        {
            title: "Compliance Reporter",
            href: "#compliance-reporter",
            icon: "mdi-file-chart",
            description: "Automated EU-compliant reports for agencies and funders"
        },
    ];

    // --- Simplified Solutions section (3 verticals only) ---
    const solutionsByMarket = [
        {
            segment: "Research Institutions",
            icon: "mdi-school",
            description:
                "Unified knowledge infrastructure for research excellence across universities and centers.",
        },
        {
            segment: "Industry",
            icon: "mdi-factory",
            description:
                "Research intelligence and trend discovery for innovation leaders.",
        },
        {
            segment: "Pre-Seed Investors",
            icon: "mdi-chart-line-variant",
            description:
                "Early visibility into promising research projects before they become startups.",
        },
    ];

    const resourcesItems = [
        {
            title: "Documentation",
            href: "#documentation",
            icon: "mdi-book-open-page-variant",
            description: "Guides and API references"
        },
        {
            title: "Case Studies",
            href: "#case-studies",
            icon: "mdi-file-document",
            description: "Success stories from our clients"
        },
        {
            title: "Blog",
            href: "#blog",
            icon: "mdi-post",
            description: "Latest insights and updates"
        },
        {
            title: "Webinars",
            href: "#webinars",
            icon: "mdi-video",
            description: "Live and recorded sessions"
        },
    ];

    return (
        <nav className={`navbar navbar-expand-lg glass-navbar ${scrolled ? "scrolled" : ""}`}>
            <div className="container-fluid">
                {/* Brand */}
                <Link className="navbar-brand brand-title" to="/">
                    <img
                        src="/logos/logo.png"
                        alt="Linked Scholar Logo"
                        className="brand-logo"
                    />
                </Link>

                {/* Search (Desktop - moved next to brand) */}
                {isNetworkPage && (
                    <div className="navbar-search-wrapper d-none d-lg-flex">
                        <MiniSearcher clientId={clientId} />
                    </div>
                )}

                {/* Right side container */}
                <div className="navbar-right-container">
                    {/* Hamburger Button */}
                    <button
                        className={`navbar-toggler ${mobileOpen ? "open" : ""}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setMobileOpen(!mobileOpen);
                        }}
                        aria-label="Toggle navigation"
                        aria-expanded={mobileOpen}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>

                {/* Desktop Nav Links */}
                <div className={`navbar-collapse ${mobileOpen ? "show" : ""}`}>
                    <div className="navbar-nav-links">
                        {/* Solutions Dropdown - Simplified */}
                        <div
                            className="nav-item solutions-dropdown"
                            onMouseEnter={() => window.innerWidth > 991 && setSolutionsDropdownOpen(true)}
                            onMouseLeave={() => window.innerWidth > 991 && setSolutionsDropdownOpen(false)}
                        >
                            <button
                                className="nav-link dropdown-trigger"
                                onClick={toggleSolutionsDropdown}
                                aria-expanded={solutionsDropdownOpen}
                            >
                                <span className="SiteHeaderNavItem__linkText">Solutions</span>
                                <i
                                    className={`mdi mdi-chevron-down dropdown-chevron ${
                                        solutionsDropdownOpen ? "open" : ""
                                    }`}
                                ></i>
                            </button>

                            <div
                                className={`dropdown-menu-custom solutions-wide ${
                                    solutionsDropdownOpen ? "show" : ""
                                }`}
                            >
                                {solutionsByMarket.map((group, idx) => (
                                    <a
                                        key={idx}
                                        href="#"
                                        className="dropdown-item-custom"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSolutionsDropdownOpen(false);
                                        }}
                                    >
                                        <i className={`mdi ${group.icon} item-icon`}></i>
                                        <div className="item-content">
                                            <div className="item-title">{group.segment}</div>
                                            <div className="item-description">{group.description}</div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Products Dropdown - SECOND */}
                        <div
                            className="nav-item products-dropdown"
                            onMouseEnter={() => window.innerWidth > 991 && setProductsDropdownOpen(true)}
                            onMouseLeave={() => window.innerWidth > 991 && setProductsDropdownOpen(false)}
                        >
                            <button
                                className="nav-link dropdown-trigger"
                                onClick={toggleProductsDropdown}
                                aria-expanded={productsDropdownOpen}
                            >
                                <span className="SiteHeaderNavItem__linkText">Products</span>
                                <i
                                    className={`mdi mdi-chevron-down dropdown-chevron ${
                                        productsDropdownOpen ? "open" : ""
                                    }`}
                                ></i>
                            </button>
                            <div
                                className={`dropdown-menu-custom products-wide ${
                                    productsDropdownOpen ? "show" : ""
                                }`}
                            >
                                {productsItems.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.href}
                                        className="dropdown-item-custom"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavigation(item.href, () => setProductsDropdownOpen(false));
                                        }}
                                    >
                                        <i className={`mdi ${item.icon} item-icon`}></i>
                                        <div className="item-content">
                                            <div className="item-title">{item.title}</div>
                                            <div className="item-description">{item.description}</div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Resources Dropdown - THIRD */}
                        <div
                            className="nav-item resources-dropdown"
                            onMouseEnter={() => window.innerWidth > 991 && setResourcesDropdownOpen(true)}
                            onMouseLeave={() => window.innerWidth > 991 && setResourcesDropdownOpen(false)}
                        >
                            <button
                                className="nav-link dropdown-trigger"
                                onClick={toggleResourcesDropdown}
                                aria-expanded={resourcesDropdownOpen}
                            >
                                <span className="SiteHeaderNavItem__linkText">Resources</span>
                                <i
                                    className={`mdi mdi-chevron-down dropdown-chevron ${
                                        resourcesDropdownOpen ? "open" : ""
                                    }`}
                                ></i>
                            </button>
                            <div
                                className={`dropdown-menu-custom resources-menu ${
                                    resourcesDropdownOpen ? "show" : ""
                                }`}
                            >
                                {resourcesItems.map((item, index) => (
                                    <a
                                        key={index}
                                        href={item.href}
                                        className="dropdown-item-custom"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleNavigation(item.href, () => setResourcesDropdownOpen(false));
                                        }}
                                    >
                                        <i className={`mdi ${item.icon} item-icon`}></i>
                                        <div className="item-content">
                                            <div className="item-title">{item.title}</div>
                                            <div className="item-description">{item.description}</div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Pricing - Direct Link like Stripe */}
                        <a
                            href="#pricing"
                            className="nav-link nav-link-direct"
                            onClick={(e) => {
                                e.preventDefault();
                                handleNavigation("#pricing", () => {});
                            }}
                        >
                            <span className="SiteHeaderNavItem__linkText">Pricing</span>
                        </a>
                    </div>

                    {/* Auth Controls - Desktop */}
                    <div className="navbar-auth-section d-none d-lg-flex ms-auto">
                        {authenticated ? (
                            <button
                                className="btn btn-outline-secondary btn-sm logout-btn"
                                onClick={handleLogout}
                            >
                                <i className="mdi mdi-logout me-1"></i>
                                Logout
                            </button>
                        ) : (
                            showSignIn && (
                                <button
                                    className="btn btn-primary btn-sm login-btn"
                                    onClick={() => (window.location.href = "/login")}
                                >
                                    <i className="mdi mdi-calendar-check me-1"></i>
                                    Book a Demo
                                </button>
                            )
                        )}
                    </div>

                    {/* Mobile Auth */}
                    <div className="navbar-auth-section mobile-auth d-lg-none">
                        {authenticated ? (
                            <button
                                className="btn btn-outline-secondary btn-sm logout-btn w-100"
                                onClick={handleLogout}
                            >
                                <i className="mdi mdi-logout me-1"></i>
                                Logout
                            </button>
                        ) : (
                            showSignIn && (
                                <button
                                    className="btn btn-primary btn-sm login-btn w-100"
                                    onClick={() => (window.location.href = "/login")}
                                >
                                    <i className="mdi mdi-calendar-check me-1"></i>
                                    Book a Demo
                                </button>
                            )
                        )}
                    </div>

                    {/* Search - Mobile */}
                    {isNetworkPage && (
                        <div className="navbar-search-wrapper mobile-search d-lg-none">
                            <MiniSearcher clientId={clientId} />
                        </div>
                    )}
                </div>
            </div>

            {/* Overlay for mobile menu */}
            {mobileOpen && <div className="navbar-overlay" onClick={() => setMobileOpen(false)}></div>}
        </nav>
    );
};

export default Navbar;
