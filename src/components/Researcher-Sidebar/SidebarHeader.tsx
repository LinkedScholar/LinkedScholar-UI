import React from "react";
import "../../styles/components/researcherSidebar.scss";

interface SidebarHeaderProps {
    title: string;
    onClose: () => void;
    compressed: boolean;
    toggleCompressed: () => void;
}

const SidebarHeader: React.FC<SidebarHeaderProps> = ({
                                                         title,
                                                         onClose,
                                                         compressed,
                                                         toggleCompressed,
                                                     }) => {
    if (compressed) {
        return (
            <div className="sidebar-header compressed-header d-flex justify-content-center align-items-center p-2">
                <button
                    className="btn btn-outline-secondary rounded-circle decompress-button"
                    onClick={toggleCompressed}
                >
                    <i className="mdi mdi-account"></i>
                </button>
            </div>
        );
    }

    return (
        <div className="sidebar-header p-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="mb-0 text-secondary-color">{title}</h4>
                <div className="btn-group" role="group">
                    <button
                        className="btn btn-link p-0 border-0 shadow-none mx-2"
                        onClick={toggleCompressed}
                    >
                        <i className="mdi mdi-chevron-left fs-3"></i>
                    </button>
                    <button
                        className="btn btn-link p-0 border-0 shadow-none mx-2"
                        onClick={onClose}
                    >
                        <i className="mdi mdi-close fs-3"></i>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SidebarHeader;
