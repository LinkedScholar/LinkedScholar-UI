import React from "react";

interface SidebarTabsProps {
    activeTab: "researcher" | "group" | "publications";
    setActiveTab: (tab: "researcher" | "group" | "publications") => void;
}

const SidebarTabs: React.FC<SidebarTabsProps> = ({ activeTab, setActiveTab }) => (
    <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
            <button
                className={`nav-link ${activeTab === "researcher" ? "active" : ""}`}
                onClick={() => setActiveTab("researcher")}
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
