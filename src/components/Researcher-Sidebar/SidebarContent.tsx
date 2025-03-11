import React from "react";
import { NodeDatum } from "../../types/graphTypes";

interface SidebarContentProps {
    activeTab: "researcher" | "group" | "publications";
    selectedNode: NodeDatum;
    onAddInterest?: (interest: string) => void;
}

const isURL = (str: string): boolean => {
    try {
        new URL(str);
        return true;
    } catch {
        return (
            str.startsWith("http://") ||
            str.startsWith("https://") ||
            str.includes(".edu") ||
            str.includes(".com") ||
            str.includes(".org") ||
            str.includes(".net")
        );
    }
};

const formatKeyName = (key: string): string =>
    key.replace(/_/g, " ").replace(/\b\w/g, (char) => char.toUpperCase());

const capitalizeFirstLetter = (text: string): string =>
    text.replace(/\b\w/g, (char) => char.toUpperCase());

const SidebarContent: React.FC<SidebarContentProps> = ({
                                                           activeTab,
                                                           selectedNode,
                                                           onAddInterest,
                                                       }) => {
    // Filter out keys that are not relevant for display
    const ignoreKeys = ["id", "x", "y", "fx", "fy", "vx", "vy", "fixed"];
    const sortedEntries = Object.entries(selectedNode)
        .filter(([key]) => !ignoreKeys.includes(key))
        .sort(([keyA], [keyB]) => {
            if (keyA.toLowerCase() === "name") return -1;
            if (keyB.toLowerCase() === "name") return 1;
            if (keyA.toLowerCase().includes("interest")) return 1;
            if (keyB.toLowerCase().includes("interest")) return -1;
            return 0;
        });

    if (activeTab === "researcher") {
        return (
            <div className="sidebar-content">
                {sortedEntries.map(([key, value]) => {
                    // Render interests specially
                    if (key.toLowerCase().includes("interest")) {
                        const interests = String(value)
                            .split(",")
                            .map((i) => i.trim())
                            .filter((i) => i.length > 0);
                        if (interests.length === 0) return null;
                        return (
                            <div key={key} className="metadata-item full-width">
                                <div className="interest-tags">
                                    {interests.map((interest, index) => (
                                        <span key={index} className="interest-tag">
                      {interest}
                                            {onAddInterest && (
                                                <button
                                                    className="remove-interest btn btn-sm btn-outline-primary ms-1"
                                                    onClick={() => onAddInterest(interest)}
                                                >
                                                    <i className="mdi mdi-plus"></i>
                                                </button>
                                            )}
                    </span>
                                    ))}
                                </div>
                            </div>
                        );
                    }
                    return (
                        <div key={key} className="metadata-item">
                            <p className="metadata-key">{formatKeyName(key)}:&nbsp;</p>
                            {isURL(String(value)) ? (
                                <a
                                    href={String(value).startsWith("http") ? String(value) : `https://${String(value)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="metadata-value-link"
                                >
                                    {String(value)}
                                </a>
                            ) : (
                                <p className="metadata-value">{capitalizeFirstLetter(String(value))}</p>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    } else if (activeTab === "group") {
        return (
            <div className="sidebar-content">
                <div className="metadata-item">
                    <p className="metadata-value">
                        Group content goes here. Display all researchers from the same affiliation.
                    </p>
                </div>
            </div>
        );
    } else if (activeTab === "publications") {
        return (
            <div className="sidebar-content">
                <div className="metadata-item">
                    <p className="metadata-value">Publications content goes here.</p>
                </div>
            </div>
        );
    }
    return null;
};

export default SidebarContent;
