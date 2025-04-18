import React, { useState, useEffect, useRef } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarTabs from "./SidebarTabs";
import SidebarContent from "./SidebarContent";
import { NodeDatum, LinkDatum } from "../../types/graphTypes";
import "../../styles/components/researcherSidebar.scss";

interface ResearcherSidebarProps {
    selectedNode: NodeDatum | null;
    onClose: () => void;
    onAddInterest?: (interest: string) => void;
    nodes?: NodeDatum[];
    links?: LinkDatum[];
    bfsPath?: string[] | null;
    onExtendNetwork?: () => void;
    onBFSRequest?: (
        startId: string,
        connectionType: "affiliation" | "author",
        selectedValue: string
    ) => void;
}

const ResearcherSidebar: React.FC<ResearcherSidebarProps> = ({
                                                                 selectedNode,
                                                                 onClose,
                                                                 onAddInterest,
                                                                 nodes = [],
                                                                 links = [],
                                                                 bfsPath = null,
                                                                 onBFSRequest,
                                                                 onExtendNetwork
                                                             }) => {
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);
    const [compressed, setCompressed] = useState(false);
    const [activeTab, setActiveTab] = useState<"author" | "group" | "publications" | "options">("author");
    const [selectedConnection, setSelectedConnection] = useState<{ value: string; label: string } | null>(null);
    const [connectionType, setConnectionType] = useState<"affiliation" | "author">("affiliation");
    const [connectionExpanded, setConnectionExpanded] = useState(false);
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [menuIsOpen, setMenuIsOpen] = useState<boolean | undefined>(undefined);

    useEffect(() => {
        if (selectedNode) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }, [selectedNode]);

    useEffect(() => {
        if (selectedNode && onBFSRequest) {
            onBFSRequest(String(selectedNode.id), connectionType, selectedConnection?.value || "");
        }
    }, [selectedNode, connectionType, selectedConnection, onBFSRequest]);

    const handleClearSearch = () => {
        setIsSearchActive(false);
        setSelectedConnection(null);
        if (selectedNode && onBFSRequest) {
            onBFSRequest(String(selectedNode.id), connectionType, "");
        }
    };

    const handleSearch = () => {
        if (!selectedConnection) {
            return;
        }
        setIsSearchActive(true);
        if (selectedNode && onBFSRequest) {
            onBFSRequest(String(selectedNode.id), connectionType, selectedConnection.value);
        }
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div
            className={`researcher-sidebar ${isVisible ? "open" : ""} ${compressed ? "compressed" : ""}`}
            ref={sidebarRef}
        >
            
            <SidebarHeader
                title="Researcher Details"
                onClose={onClose}
                compressed={compressed}
                toggleCompressed={() => setCompressed(!compressed)}
            />
            {/* Render the rest of the content only if not compressed */}
            {!compressed && (
                <>
                    <SidebarTabs activeTab={activeTab} setActiveTab={setActiveTab} />
                    {selectedNode && (
                        <SidebarContent
                            activeTab={activeTab}
                            selectedNode={selectedNode}
                            onAddInterest={onAddInterest}
                            onExtendNetwork={onExtendNetwork}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default ResearcherSidebar;
