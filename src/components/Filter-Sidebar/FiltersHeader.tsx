import React from "react";
import "@mdi/font/css/materialdesignicons.min.css";
import "../../styles/components/filters.scss";

interface FiltersHeaderProps {
  title: string;
  compressed: boolean;
  onToggleCompressed: () => void;
}

const FiltersHeader: React.FC<FiltersHeaderProps> = ({
  title,
  compressed,
  onToggleCompressed,
}) => {
  if (compressed) {
    return (
      <div className="filters-header compressed">
        <button
          className="btn btn-outline-secondary filters-toggle-btn"
          onClick={onToggleCompressed}
          title="Expand Filters"
        >
          <i className="mdi mdi-filter"></i>
        </button>
      </div>
    );
  }
  return (
    <div className="filters-header">
      <div className="d-flex justify-content-between align-items-center">
        <h4 className="mb-0">{title}</h4>
        <button
          className="btn btn-link filters-toggle-btn"
          onClick={onToggleCompressed}
          title="Compress Filters"
        >
          <i className="mdi mdi-chevron-left"></i>
        </button>
      </div>
    </div>
  );
};

export default FiltersHeader;
