import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";
import { NodeDatum } from "../types/graphTypes";
import "../styles/components/pathWindow.scss";

interface PathWindowProps {
    bfsPath: string[] | null;
    nodes: NodeDatum[];
    expanded: boolean;
    setExpanded: (expanded: boolean) => void;
    startNode: { value: string; label: string } | null;
    setStartNode: (option: { value: string; label: string } | null) => void;
    targetType: "Affiliation" | "researcher";
    setTargetType: (type: "Affiliation" | "researcher") => void;
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

    const researcherOptions = nodes.map((nd) => {
        const display = nd.name ? nd.name : nd.id.toString();
        return {
            value: display,
            label: display,
        };
    });

    const affiliationOptions = Array.from(
        new Set(
            nodes
                .map((nd) => nd.affiliation)
                .filter((aff): aff is string => typeof aff === "string" && aff.trim() !== "")
        )
    ).map((aff) => ({
        value: aff,
        label: aff,
    }));

    return (
        <div className="path-window p-3 bg-light border rounded">
            <div className="path-window-header d-flex justify-content-between align-items-center">
                <h3 className="mb-0 text-secondary-color">Find Path</h3>
                <button className="btn btn-link p-0" onClick={() => setExpanded(false)}>
                    <i className="mdi mdi-close"></i>
                </button>
            </div>

            {expanded && (
                <div className="path-form mt-3">
                    {/* Start Node Selection (researcher only) */}
                    <div className="mb-3">
                        <label className="form-label">Start Node (Researcher):</label>
                        <CreatableSelect
                            value={startNode}
                            onChange={(option) =>
                                setStartNode(option as { value: string; label: string })
                            }
                            onCreateOption={(inputValue) =>
                                setStartNode({ value: inputValue, label: inputValue })
                            }
                            options={researcherOptions}
                            placeholder="Select or type a start node..."
                            className="node-select"
                            isSearchable
                            formatCreateLabel={(inputValue) => `Search "${inputValue}"`}
                            noOptionsMessage={({ inputValue }) =>
                                `No matches found for "${inputValue}"`
                            }
                            isValidNewOption={() => true}
                            classNamePrefix="react-select"
                            menuPortalTarget={document.body}
                            maxMenuHeight={150}
                            menuPosition="fixed"
                            menuPlacement="auto"
                            menuIsOpen={startMenuIsOpen}
                            onMenuOpen={() => setStartMenuIsOpen(true)}
                            onMenuClose={() => setStartMenuIsOpen(false)}
                            styles={{
                                menuPortal: (base) => ({
                                    ...base,
                                    zIndex: 9999,
                                }),
                            }}
                        />
                    </div>

                    {/* Target Type selection */}
                    <div className="mb-3">
                        <label className="form-label">Target Type:</label>
                        <div className="btn-group" role="group">
                            <button
                                type="button"
                                className={`btn ${
                                    targetType === "Affiliation"
                                        ? "btn-primary"
                                        : "btn-outline-primary"
                                }`}
                                onClick={() => {
                                    setTargetType("Affiliation");
                                    setTargetNode(null);
                                }}
                            >
                                Affiliation
                            </button>
                            <button
                                type="button"
                                className={`btn ${
                                    targetType === "researcher"
                                        ? "btn-primary"
                                        : "btn-outline-primary"
                                }`}
                                onClick={() => {
                                    setTargetType("researcher");
                                    setTargetNode(null);
                                }}
                            >
                                Researcher
                            </button>
                        </div>
                    </div>

                    {/* Target Node Selection */}
                    <div className="mb-3">
                        <label className="form-label">Target Node:</label>
                        <CreatableSelect
                            value={targetNode}
                            onChange={(option) =>
                                setTargetNode(option as { value: string; label: string })
                            }
                            onCreateOption={(inputValue) =>
                                setTargetNode({ value: inputValue, label: inputValue })
                            }
                            options={
                                targetType === "Affiliation" ? affiliationOptions : researcherOptions
                            }
                            placeholder="Select or type a target node..."
                            className="node-select"
                            isSearchable
                            formatCreateLabel={(inputValue) => `Search "${inputValue}"`}
                            noOptionsMessage={({ inputValue }) =>
                                `No matches found for "${inputValue}"`
                            }
                            isValidNewOption={() => true}
                            classNamePrefix="react-select"
                            menuPortalTarget={document.body}
                            maxMenuHeight={150}
                            menuPosition="fixed"
                            menuPlacement="auto"
                            menuIsOpen={targetMenuIsOpen}
                            onMenuOpen={() => setTargetMenuIsOpen(true)}
                            onMenuClose={() => setTargetMenuIsOpen(false)}
                            styles={{
                                menuPortal: (base) => ({
                                    ...base,
                                    zIndex: 9999,
                                }),
                            }}
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

                    {bfsPath && (
                        <div className="bfs-path mt-3">
                            <h3>Path:</h3>
                            <ul>
                                {bfsPath.map((nodeId, index) => {
                                    const found = nodes.find(
                                        (n) => n.id.toString() === nodeId || n.name === nodeId
                                    );
                                    return (
                                        <li key={index}>
                                            {found?.name || found?.affiliation || nodeId}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PathWindow;
