import React, { useState } from "react";
import { NodeDatum } from "../types/graphTypes";
import CustomSearchField from "./CustomSearchField";
import "../styles/components/pathWindow.scss";

interface PathWindowProps {
    bfsPath: string[] | null;
    nodes: NodeDatum[];
    expanded: boolean;
    setExpanded: (expanded: boolean) => void;
    startNode: { value: string; label: string } | null;
    setStartNode: (option: { value: string; label: string } | null) => void;
    targetType: "affiliation" | "author";
    setTargetType: (type: "affiliation" | "author") => void;
    targetNode: { value: string; label: string } | null;
    setTargetNode: (option: { value: string; label: string } | null) => void;
    handleSearch: () => void;
    handleClearSearch: () => void;
}

const PathWindow: React.FC<PathWindowProps> = ({
                                                   bfsPath,
                                                   nodes,
                                                   expanded,
                                                   setExpanded,
                                                   startNode,
                                                   setStartNode,
                                                   targetType,
                                                   setTargetType,
                                                   targetNode,
                                                   setTargetNode,
                                                   handleSearch,
                                                   handleClearSearch,
                                               }) => {
    const [startMenuIsOpen, setStartMenuIsOpen] = useState<boolean>(false);
    const [targetMenuIsOpen, setTargetMenuIsOpen] = useState<boolean>(false);

    // Researcher options loaded from all nodes - excluding nodes of type "article"
    const researcherOptions = nodes
        .filter(nd => nd.type !== "article")
        .map((nd) => {
            const display = nd.name ? nd.name : nd.id.toString();
            return {
                value: display,
                label: display,
            };
        });

    // Load all affiliations, handling both arrays and single string values
    const allAffiliations = nodes.flatMap((nd) => {
        if (Array.isArray(nd.affiliation)) {
            return nd.affiliation;
        } else if (typeof nd.affiliation === "string") {
            return [nd.affiliation];
        }
        return [];
    });

    const affiliationOptions = Array.from(
        new Set(allAffiliations.filter((aff) => aff && aff.trim() !== ""))
    ).map((aff) => ({
        value: aff,
        label: aff,
    }));

    return (
        <div className="path-window p-3 bg-light border rounded shadow-sm">
            <div className="path-window-header d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
                <h3 className="mb-0 text-secondary-color">Find Path</h3>
                <button className="btn btn-link p-0" onClick={() => setExpanded(false)}>
                    <i className="mdi mdi-close"></i>
                </button>
            </div>

            {expanded && (
                <div className="path-form">
                    <div className="mb-3">
                        <label className="form-label">Start Researcher:</label>
                        <CustomSearchField
                            value={startNode}
                            onChange={(option) => setStartNode(option)}
                            onCreateOption={(inputValue) => setStartNode({ value: inputValue, label: inputValue })}
                            options={researcherOptions}
                            placeholder="Select researcher..."
                            allowCustomValue={false}
                            menuIsOpen={startMenuIsOpen}
                            onMenuOpen={() => setStartMenuIsOpen(true)}
                            onMenuClose={() => setStartMenuIsOpen(false)}
                        />
                    </div>

                    {/* Target Type selection */}
                    <div className="mb-3">
                        <label className="form-label">Target Type:</label>
                        <div className="btn-group" role="group">
                            <button
                                type="button"
                                className={`btn ${
                                    targetType === "affiliation"
                                        ? "btn-primary"
                                        : "btn-outline-primary"
                                } d-flex align-items-center`}
                                onClick={() => {
                                    setTargetType("affiliation");
                                    setTargetNode(null);
                                }}
                            >
                                <i className="mdi mdi-domain me-1"></i> Affiliation
                            </button>
                            <button
                                type="button"
                                className={`btn ${
                                    targetType === "author"
                                        ? "btn-primary"
                                        : "btn-outline-primary"
                                } d-flex align-items-center`}
                                onClick={() => {
                                    setTargetType("author");
                                    setTargetNode(null);
                                }}
                            >
                                <i className="mdi mdi-account me-1"></i> Researcher
                            </button>
                        </div>
                    </div>

                    {/* Target Selection */}
                    <div className="mb-3">
                        <label className="form-label">
                            {targetType === "affiliation"
                                ? "Target Affiliation:"
                                : "Target Researcher:"}
                        </label>
                        <CustomSearchField
                            value={targetNode}
                            onChange={(option) => setTargetNode(option)}
                            onCreateOption={(inputValue) => setTargetNode({ value: inputValue, label: inputValue })}
                            options={
                                targetType === "affiliation" ? affiliationOptions : researcherOptions
                            }
                            placeholder={
                                targetType === "affiliation"
                                    ? "Select an affiliation..."
                                    : "Select a researcher..."
                            }
                            allowCustomValue={true}
                            menuIsOpen={targetMenuIsOpen}
                            onMenuOpen={() => setTargetMenuIsOpen(true)}
                            onMenuClose={() => setTargetMenuIsOpen(false)}
                        />
                    </div>

                    <div className="d-flex justify-content-end">
                        <button className="btn btn-primary me-2" onClick={handleSearch}>
                            <i className="mdi mdi-magnify"></i> Search
                        </button>
                        <button className="btn btn-clear" onClick={handleClearSearch}>
                            <i className="mdi mdi-close"></i> Clear Search
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PathWindow;