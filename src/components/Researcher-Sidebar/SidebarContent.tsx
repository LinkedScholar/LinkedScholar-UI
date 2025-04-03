import React, {useState} from "react";
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

const isFlatValue = (key: string, value: any) => {
    const lowerKey = key.toLowerCase();
    return (
        !Array.isArray(value) &&
        typeof value !== "object" &&
        !lowerKey.includes("interest") &&
        lowerKey !== "journals" &&
        lowerKey !== "affiliation" &&
        !isURL(String(value))
    );
};

interface SidebarContentProps {
    activeTab: "author" | "group" | "publications" | "options";
    selectedNode: NodeDatum;
    onAddInterest?: (interest: string) => void;
    onExtendNetwork?: () => void;
}

const SidebarContent: React.FC<SidebarContentProps> = ({
                                                           activeTab,
                                                           selectedNode,
                                                           onAddInterest,
                                                           onExtendNetwork,
                                                       }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleExtendNetwork = async () => {
        if (onExtendNetwork && !isLoading) {
            setIsLoading(true);
            try {
                await onExtendNetwork();
            } catch (error) {
                console.error("Error extending network:", error);
            }
            setIsLoading(false);
        }
    };
    if (activeTab === "author") {
        const ignoreKeys = ["id", "x", "y", "fx", "fy", "vx", "vy", "fixed", "type", "index", "s2id"];
        const sortedEntries = Object.entries(selectedNode)
            .filter(([key, value]) =>
                !ignoreKeys.includes(key) &&
                value !== null &&
                value !== undefined &&
                String(value).trim() !== ""
            )
            .sort(([keyA], [keyB]) => {
                if (keyA.toLowerCase() === "name") return -1;
                if (keyB.toLowerCase() === "name") return 1;
                if (keyA.toLowerCase().includes("interest")) return 1;
                if (keyB.toLowerCase().includes("interest")) return -1;
                return 0;
            });

        const cardItems = sortedEntries.filter(([key, value]) => isFlatValue(key, value));
        const otherItems = sortedEntries.filter(([key, value]) => !isFlatValue(key, value));

        return (
            <div className="sidebar-content">
                <div className="metadata-grid">
                    {cardItems.map(([key, value]) => (
                        <div key={key} className="metadata-card">
                            <p className="metadata-key">{formatKeyName(key)}</p>
                            <p className="metadata-value">{capitalizeFirstLetter(String(value))}</p>
                        </div>
                    ))}
                </div>

                {otherItems.map(([key, value]) => {
                    const formattedKey = formatKeyName(key);

                    if (key.toLowerCase().includes("interest")) {
                        const interests = String(value)
                            .split(",")
                            .map((i) => i.trim())
                            .filter((i) => i.length > 0);
                        if (interests.length === 0) return null;

                        return (
                            <div key={key} className="metadata-item full-width">
                                <p className="metadata-key">{formattedKey}:</p>
                                <div className="interest-tags">
                                    {interests.map((interest, index) => (
                                        <Tag key={index} label={interest} />
                                    ))}
                                </div>
                            </div>
                        );
                    }

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

                    if (Array.isArray(value) && typeof value[0] === "string" && isURL(value[0])) {
                        const urls = value
                            .map((url: string) => url.trim())
                            .filter((url) => url.length > 0);

                        return (
                            <div key={key} className="metadata-item">
                                <p className="metadata-key">{formattedKey}:</p>
                                <div className="url-container">
                                    {urls.map((url, index) => (
                                        <a
                                            key={index}
                                            href={url.startsWith("http") ? url : `https://${url}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="metadata-value-link"
                                        >
                                            {url}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        );
                    }

                    return (
                        <div key={key} className="metadata-item">
                            <p className="metadata-key">{formattedKey}:</p>
                            <p className="metadata-value">{capitalizeFirstLetter(String(value))}</p>
                        </div>
                    );
                })}
            </div>
        );
    }

    if (activeTab === "group") {
        return (
            <div className="sidebar-content">
                <div className="metadata-item">
                    <p className="metadata-value">
                        Group content goes here. Display all researchers from the same affiliation.
                    </p>
                </div>
            </div>
        );
    }

    if (activeTab === "publications") {
        return <PublicationsContent selectedNode={selectedNode} />;
    }

    if (activeTab === "options") {
        return (
            <div className="sidebar-content">
                <div className="options-section">
                    <div className="extend-network-wrapper">
                        <button
                            className={`extend-network-btn ${isLoading ? "loading" : ""}`}
                            onClick={handleExtendNetwork}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <svg
                                        className="animate-spin h-5 w-5 mr-2"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        />
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8v8H4z"
                                        />
                                    </svg>
                                    Loading...
                                </>
                            ) : (
                                <>
                                    <i className="mdi mdi-google-circles-extended me-2"></i>
                                    Get Full Network
                                </>
                            )}
                        </button>

                        <div className="tooltip-container">
                            <i className="mdi mdi-information-outline info-icon"></i>
                            <div className="tooltip-box">
                                Show the author’s full network of connections and collaborators.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export default SidebarContent;
