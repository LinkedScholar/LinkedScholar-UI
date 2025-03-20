import React from "react";
import { NodeDatum } from "../../types/graphTypes";
import PublicationsContent from "./PublicationsContent";
import Tag from "./Tag";

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

interface SidebarContentProps {
    activeTab: "author" | "group" | "publications";
    selectedNode: NodeDatum;
    onAddInterest?: (interest: string) => void;
}
const SidebarContent: React.FC<SidebarContentProps> = ({
                                                           activeTab,
                                                           selectedNode,
                                                           onAddInterest,
                                                       }) => {
    if (activeTab === "author") {
        const ignoreKeys = ["id", "x", "y", "fx", "fy", "vx", "vy", "fixed", "type", "index"];
        const sortedEntries = Object.entries(selectedNode)
            .filter(([key, value]) =>
                !ignoreKeys.includes(key) &&
                value !== null &&
                value !== undefined &&
                String(value).trim() !== "" // Ensure no empty or whitespace-only values
            )
            .sort(([keyA], [keyB]) => {
                if (keyA.toLowerCase() === "name") return -1;
                if (keyB.toLowerCase() === "name") return 1;
                if (keyA.toLowerCase().includes("interest")) return 1;
                if (keyB.toLowerCase().includes("interest")) return -1;
                return 0;
            });

        return (
            <div className="sidebar-content">
                {sortedEntries.map(([key, value]) => {
                    const formattedKey = formatKeyName(key);

                    // Handling interests as tags
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
                                        <Tag key={index} label={interest} />
                                    ))}
                                </div>
                            </div>
                        );
                    }

                    // Handling Affiliation & Journals as tags
                    if (key.toLowerCase() === "affiliation" || key.toLowerCase() === "journals") {
                        const items = String(value)
                            .split(",")
                            .map((item) => item.trim())
                            .filter((item) => item.length > 0);

                        if (items.length === 0) return null;
                        return (
                            <div key={key} className="metadata-item">
                                <p className="metadata-key">{formattedKey}:</p>
                                <div className="tag-container">
                                    {items.map((item, index) => (
                                        <Tag key={index} label={item} />
                                    ))}
                                </div>
                            </div>
                        );
                    }

                    // Handling URLs
                    if (isURL(String(value))) {
                        return (
                            <div key={key} className="metadata-item">
                                <p className="metadata-key">{formattedKey}:</p>
                                <a
                                    href={String(value).startsWith("http") ? String(value) : `https://${String(value)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="metadata-value-link"
                                >
                                    {String(value)}
                                </a>
                            </div>
                        );
                    }

                    // Default case for other metadata
                    return (
                        <div key={key} className="metadata-item">
                            <p className="metadata-key">{formattedKey}:</p>
                            <p className="metadata-value">{capitalizeFirstLetter(String(value))}</p>
                        </div>
                    );
                })}
            </div>
        );
    } else if (activeTab === "group") {
        return (
            <div className="sidebar-content">
                <div className="metadata-item">
                    <p className="metadata-value">Group content goes here. Display all researchers from the same affiliation.</p>
                </div>
            </div>
        );
    } else if (activeTab === "publications") {
        return <PublicationsContent selectedNode={selectedNode} />;
    }
    return null;
};

export default SidebarContent;
