import React from "react";
import "@mdi/font/css/materialdesignicons.min.css";
import "../styles/components/toolbar.scss";

interface ToolbarProps {
    gridActive: boolean;
    filtersActive: boolean;
    pathWindowActive: boolean;
    toggleGrid: () => void;
    toggleFilters: () => void;
    togglePathWindow: () => void;
    resetSimulation: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
                                             gridActive,
                                             filtersActive,
                                             pathWindowActive,
                                             toggleGrid,
                                             toggleFilters,
                                             togglePathWindow,
                                             resetSimulation,
                                         }) => {
    return (
        <div className="toolbar">
            <button
                className={`toolbar-button ${gridActive ? "active" : ""}`}
                onClick={toggleGrid}
                title="Toggle Grid"
            >
                <i className="mdi mdi-view-grid"></i>
                <span>Grid</span>
            </button>
            <button
                className={`toolbar-button ${filtersActive ? "active" : ""}`}
                onClick={toggleFilters}
                title="Toggle Filters"
            >
                <i className="mdi mdi-filter"></i>
                <span>Filters</span>
            </button>
            <button
                className={`toolbar-button ${pathWindowActive ? "active" : ""}`}
                onClick={togglePathWindow}
                title="Find Path"
            >
                <i className="mdi mdi-source-branch"></i>
                <span>Path</span>
            </button>
            <button
                className="toolbar-button"
                onClick={resetSimulation}
                title="Reset Simulation"
            >
                <i className="mdi mdi-refresh"></i>
                <span>Reset Simulation</span>
            </button>
        </div>
    );
};

export default Toolbar;
