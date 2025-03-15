// src/components/Filter-Sidebar/filters.tsx
import React, { useState, useEffect } from "react";
import "../../styles/components/filters.scss";

interface FiltersProps {
  affiliations: string[];
  selectedAffiliations: string[];
  onFilterChange: (selected: string[]) => void;
  onClose: () => void;
}

const Filters: React.FC<FiltersProps> = ({
  affiliations,
  selectedAffiliations,
  onFilterChange,
  onClose,
}) => {
  const [localSelected, setLocalSelected] = useState<string[]>(selectedAffiliations);

  useEffect(() => {
    setLocalSelected(selectedAffiliations);
  }, [selectedAffiliations]);

  const handleCheckboxChange = (affiliation: string) => {
    let updatedSelected: string[];
    if (localSelected.includes(affiliation)) {
      updatedSelected = localSelected.filter((a) => a !== affiliation);
    } else {
      updatedSelected = [...localSelected, affiliation];
    }
    setLocalSelected(updatedSelected);
    onFilterChange(updatedSelected);
  };

  return (
    <div className="path-window p-3 bg-light border rounded">
      <div className="path-window-header d-flex justify-content-between align-items-center">
        <h3 className="mb-0 text-secondary-color">Affiliation Filters</h3>
        <button className="btn btn-link p-0" onClick={onClose}>
          <i className="mdi mdi-close"></i>
        </button>
      </div>

      <div className="filters-content mt-3">
        <p className="text-muted">
          Select affiliations to highlight
        </p>
        
        {/* Fixed height container with scrollbar */}
        <div className="filters-list-container">
          <ul className="list-unstyled">
            {affiliations.map((affiliation) => (
              <li key={affiliation}>
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id={affiliation}
                    checked={localSelected.includes(affiliation)}
                    onChange={() => handleCheckboxChange(affiliation)}
                  />
                  <label className="form-check-label" htmlFor={affiliation}>
                    {affiliation}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Filters;