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
    const {
        authenticated,
        firstName,
        lastName,
        email,
        status,
        attempts
    } = useSelector((state: RootState) => state.auth);

    const dispatch: AppDispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [solutionsDropdownOpen, setSolutionsDropdownOpen] = useState(false);
    const location = useLocation();

    const isNetworkPage = location.pathname === "/network";

    useEffect(() => {
        if (status === "idle" && attempts === 0) {
            dispatch(fetchSession());
        }
    }, [dispatch, status, attempts]);

    const handleLogin = () => {
        window.location.href = "/login";
    };

    const navigate = useNavigate();

    const handleLogout = async () => {
        const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:8080";
        try {
            await fetch(`${baseUrl}/api/user/logout`, {
                method: "POST",
                credentials: "include",
            });
            dispatch(logout());
            navigate('/');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    const showSignIn = !authenticated && status !== "loading";

    const solutionsItems = [
        {
            icon: "mdi-chart-line",
            title: "Data Visualisation",
            description: "Interactive network graphs and research analytics",
            href: "#data-visualization"
        },
        {
            icon: "mdi-account-group",
            title: "Team & Funding Matchmaking",
            description: "Connect researchers with funding opportunities",
            href: "#matchmaking"
        },
        {
            icon: "mdi-trending-up",
            title: "Trend Report Generator",
            description: "AI-powered insights on emerging research trends",
            href: "#trend-reports"
        }
    ];

    return (
        <nav className="navbar navbar-expand-lg glass-navbar">
            <div className="container">
                {/* Left: Brand Logo + Solutions */}
                <div className="navbar-left-section d-flex align-items-center">
                    <Link className="navbar-brand brand-title" to="/">
                        Linked <span>Scholar</span>
                    </Link>
                    
                    {/* Solutions Dropdown - positioned right after logo */}
                    <div className="navbar-nav-links d-none d-lg-flex">
                        <div 
                            className="nav-item solutions-dropdown"
                            onMouseEnter={() => setSolutionsDropdownOpen(true)}
                            onMouseLeave={() => setSolutionsDropdownOpen(false)}
                        >
                            <button className="nav-link solutions-trigger">
                                Solutions
                                <i className={`mdi mdi-chevron-down solutions-chevron ${solutionsDropdownOpen ? 'open' : ''}`}></i>
                            </button>
                            
                            <div className={`solutions-dropdown-menu ${solutionsDropdownOpen ? 'show' : ''}`}>
                                <div className="solutions-dropdown-content">
                                    {solutionsItems.map((item, index) => (
                                        <a 
                                            key={index}
                                            href={item.href} 
                                            className="solution-item"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                // Handle navigation to solution pages
                                                console.log(`Navigate to ${item.title}`);
                                            }}
                                        >
                                            <div className="solution-icon">
                                                <i className={`mdi ${item.icon}`}></i>
                                            </div>
                                            <div className="solution-content">
                                                <div className="solution-title">{item.title}</div>
                                                <div className="solution-description">{item.description}</div>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Center: Search Bar - only on network page */}
                {isNetworkPage && (
                    <div className="navbar-search-wrapper d-none d-md-flex">
                        <MiniSearcher clientId={clientId} />
                    </div>
                )}

                {/* Right: Authentication */}
                <div className="navbar-nav-container">
                    {status === "loading" && attempts < 2 ? (
                        <p className="loading-text">Loading...</p>
                    ) : authenticated ? (
                        <div className="dropdown">
                            <button
                                className="btn profile-btn dropdown-toggle d-flex align-items-center"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                {firstName && lastName ? `${firstName} ${lastName}` : "Profile"}
                            </button>

                            {dropdownOpen && (
                                <ul className="dropdown-menu show">
                                    <li className="dropdown-item text-muted">{email}</li>
                                    <li>
                                        <button className="dropdown-item text-danger" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    ) : (
                        showSignIn && (
                            <button className="btn login-btn" onClick={handleLogin}>
                                Sign In
                            </button>
                        )
                    )}
                </div>

                {/* Mobile Search Bar */}
                {isNetworkPage && (
                    <div className="navbar-search-mobile d-md-none w-100 mt-2">
                        <MiniSearcher clientId={clientId} />
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;