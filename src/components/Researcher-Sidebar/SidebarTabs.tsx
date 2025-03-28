import React, { useRef, useEffect, useState } from "react";

interface SidebarTabsProps {
    activeTab: "author" | "group" | "publications" | "options";
    setActiveTab: (tab: "author" | "group" | "publications" | "options") => void;
}

const SidebarTabs: React.FC<SidebarTabsProps> = ({ activeTab, setActiveTab }) => {
    const scrollRef = useRef<HTMLUListElement>(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(false);

    useEffect(() => {
        const checkScroll = () => {
            const el = scrollRef.current;
            if (el) {
                setShowLeftArrow(el.scrollLeft > 0);
                setShowRightArrow(el.scrollLeft + el.clientWidth < el.scrollWidth);
            }
        };

        checkScroll();
        scrollRef.current?.addEventListener("scroll", checkScroll);
        window.addEventListener("resize", checkScroll);

        return () => {
            scrollRef.current?.removeEventListener("scroll", checkScroll);
            window.removeEventListener("resize", checkScroll);
        };
    }, []);

    const scrollTabs = (direction: "left" | "right") => {
        const el = scrollRef.current;
        if (el) {
            const scrollAmount = 120;
            el.scrollBy({ left: direction === "left" ? -scrollAmount : scrollAmount, behavior: "smooth" });
        }
    };

    return (
        <div className="tab-scroll-wrapper">
            {showLeftArrow && (
                <button className="scroll-arrow left" onClick={() => scrollTabs("left")}>
                    <i className="mdi mdi-chevron-left"></i>
                </button>
            )}
            <ul className="nav nav-tabs mb-3 sidebar-tabs" ref={scrollRef}>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === "author" ? "active" : ""}`} onClick={() => setActiveTab("author")}>
                        <i className="mdi mdi-account me-1"></i> Researcher
                    </button>
                </li>
                <li className="nav-item d-none">
                    <button className={`nav-link ${activeTab === "group" ? "active" : ""}`} onClick={() => setActiveTab("group")}>
                        <i className="mdi mdi-account-group-outline me-1"></i> Group
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === "publications" ? "active" : ""}`} onClick={() => setActiveTab("publications")}>
                        <i className="mdi mdi-book-open-page-variant-outline me-1"></i> Publications
                    </button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${activeTab === "options" ? "active" : ""}`} onClick={() => setActiveTab("options")}>
                        <i className="mdi mdi-cog-outline me-1"></i> Options
                    </button>
                </li>
            </ul>
            {showRightArrow && (
                <button className="scroll-arrow right" onClick={() => scrollTabs("right")}>
                    <i className="mdi mdi-chevron-right"></i>
                </button>
            )}
        </div>
    );
};

export default SidebarTabs;
