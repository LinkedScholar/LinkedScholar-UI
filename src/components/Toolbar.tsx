import React from "react";
import "@mdi/font/css/materialdesignicons.min.css";
import "../styles/components/toolbar.scss";

interface ToolbarProps {
    gridActive: boolean;
    filtersActive: boolean;
    toggleGrid: () => void;
    toggleFilters: () => void;
    resetSimulation: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
                                             gridActive,
                                             filtersActive,
                                             toggleGrid,
                                             toggleFilters,
                                             resetSimulation,
                                         }) => {
    return (
        <div className="toolbar">
            <button className="toolbar-button" onClick={resetSimulation} title="Reset Simulation">
                <i className="mdi mdi-home"></i>
            </button>

            <button className={`toolbar-button ${gridActive ? "active" : ""}`} onClick={toggleGrid} title="Toggle Grid">
                <i className="mdi mdi-view-grid"></i>
            </button>

            <button className={`toolbar-button ${filtersActive ? "active" : ""}`} onClick={toggleFilters} title="Toggle Filters">
                <i className="mdi mdi-filter"></i>
            </button>
        </div>
    );
};

export default Toolbar;
