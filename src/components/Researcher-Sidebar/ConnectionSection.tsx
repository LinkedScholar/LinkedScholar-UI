import React from "react";
import CreatableSelect from "react-select/creatable";
import { NodeDatum } from "../../types/graphTypes";

interface ConnectionSectionProps {
    bfsPath: string[] | null;
    nodes: NodeDatum[];
    connectionExpanded: boolean;
    setConnectionExpanded: (expanded: boolean) => void;
    connectionType: "Affiliation" | "researcher";
    setConnectionType: (type: "Affiliation" | "researcher") => void;
    selectedConnection: { value: string; label: string } | null;
    setSelectedConnection: (option: { value: string; label: string } | null) => void;
    handleSearch: () => void;
    handleClearSearch: () => void;
    menuIsOpen: boolean | undefined;
    setMenuIsOpen: (open: boolean | undefined) => void;
}

const ConnectionSection: React.FC<ConnectionSectionProps> = ({
                                                                 bfsPath,
                                                                 nodes,
                                                                 connectionExpanded,
                                                                 setConnectionExpanded,
                                                                 connectionType,
                                                                 setConnectionType,
                                                                 selectedConnection,
                                                                 setSelectedConnection,
                                                                 handleSearch,
                                                                 handleClearSearch,
                                                                 menuIsOpen,
                                                                 setMenuIsOpen,
                                                             }) => {
    const getFilteredOptions = () => {
        const researcherOptions = nodes.map((nd) => ({
            value: nd.name || nd.id,
            label: nd.name || String(nd.id),
        }));
        const affiliationOptions = Array.from(new Set(nodes.map((nd) => nd.affiliation))).map(
            (aff) => ({
                value: aff,
                label: aff,
            })
        );
        return connectionType === "researcher" ? researcherOptions : affiliationOptions;
    };

    return (
        <div className="connection-path-section mt-3">
            <button className="btn btn-link p-0" onClick={() => setConnectionExpanded(!connectionExpanded)}>
                <i className={`mdi ${connectionExpanded ? "mdi-chevron-down" : "mdi-chevron-up"}`}></i>
                {" "}Find Best Connection Path
            </button>
            {connectionExpanded && (
                <div className="connection-form mt-3">
                    <div className="mb-3">
                        <div className="btn-group" role="group">
                            <button
                                type="button"
                                className={`btn ${connectionType === "Affiliation" ? "btn-primary" : "btn-outline-primary"}`}
                                onClick={() => {
                                    setConnectionType("Affiliation");
                                    setSelectedConnection(null);
                                }}
                            >
                                Affiliation
                            </button>
                            <button
                                type="button"
                                className={`btn ${connectionType === "researcher" ? "btn-primary" : "btn-outline-primary"}`}
                                onClick={() => {
                                    setConnectionType("researcher");
                                    setSelectedConnection(null);
                                }}
                            >
                                Researcher
                            </button>
                        </div>
                    </div>
                    <div className="mb-3">
                        <CreatableSelect
                            value={selectedConnection}
                            onChange={(option) =>
                                setSelectedConnection(option as { value: string; label: string })
                            }
                            onCreateOption={(inputValue) =>
                                setSelectedConnection({ value: inputValue, label: inputValue })
                            }
                            options={getFilteredOptions()}
                            placeholder={`Select or type a ${connectionType}...`}
                            className="connection-select"
                            isSearchable
                            formatCreateLabel={(inputValue) => `Search "${inputValue}"`}
                            noOptionsMessage={({ inputValue }) => `No matches found for "${inputValue}"`}
                            isValidNewOption={() => true}
                            classNamePrefix="react-select"
                            menuPortalTarget={document.body}
                            maxMenuHeight={150}
                            menuPosition="fixed"
                            menuPlacement="auto"
                            menuIsOpen={menuIsOpen}
                            onMenuOpen={() => setMenuIsOpen(true)}
                            onMenuClose={() => setMenuIsOpen(false)}
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
                        <button className="btn btn-danger" onClick={handleClearSearch}>
                            <i className="mdi mdi-close"></i> Clear Search
                        </button>
                    </div>
                </div>
            )}
            {bfsPath && (
                <div className="bfs-path mt-3">
                    <h3>Connection Path:</h3>
                    <ul>
                        {bfsPath.map((nodeId, index) => {
                            const found = nodes.find((n) => String(n.id) === nodeId);
                            return <li key={index}>{found?.name || found?.affiliation || nodeId}</li>;
                        })}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ConnectionSection;
