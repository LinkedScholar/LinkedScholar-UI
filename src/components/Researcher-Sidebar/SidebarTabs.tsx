import React from "react";

interface SidebarTabsProps {
    activeTab: "author" | "group" | "publications";
    setActiveTab: (tab: "author" | "group" | "publications") => void;
}

const SidebarTabs: React.FC<SidebarTabsProps> = ({ activeTab, setActiveTab }) => (
    <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
            <button
                className={`nav-link ${activeTab === "author" ? "active" : ""}`}
                onClick={() => setActiveTab("author")}
            >
                Researcher
            </button>
        </li>
        <li className="nav-item">
            <button
                className={`nav-link ${activeTab === "group" ? "active" : ""}`}
                onClick={() => setActiveTab("group")}
            >
                Group
            </button>
        </li>
        <li className="nav-item">
            <button
                className={`nav-link ${activeTab === "publications" ? "active" : ""}`}
                onClick={() => setActiveTab("publications")}
            >
                Publications
            </button>
        </li>
    </ul>
);

export default SidebarTabs;
