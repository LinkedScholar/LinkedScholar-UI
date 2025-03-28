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
        <div className="sidebar-header mb-3">
            <div className="header-top">
                <button className="icon-button" onClick={toggleCompressed}>
                    <i className="mdi mdi-chevron-right"></i>
                </button>

                <h5 className="header-title">{title}</h5>

                <button className="icon-button" onClick={onClose}>
                    <i className="mdi mdi-close"></i>
                </button>
            </div>
        </div>


    );
};

export default SidebarHeader;
