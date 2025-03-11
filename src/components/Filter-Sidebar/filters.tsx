import React, { useState, useEffect } from "react";
import "../../styles/components/filters.scss";

interface FiltersProps {
  affiliations: string[];
  selectedAffiliations: string[];
  onFilterChange: (selected: string[]) => void;
  onClose: () => void; // Parent decides how to hide/unmount the sidebar
}

const Filters: React.FC<FiltersProps> = ({
  affiliations,
  selectedAffiliations,
  onFilterChange,
  onClose,
}) => {
  // Keep local track of the user's filter selections
  const [localSelected, setLocalSelected] = useState<string[]>(selectedAffiliations);

  useEffect(() => {
    // Sync with external selections (if parent changes them)
    setLocalSelected(selectedAffiliations);
  }, [selectedAffiliations]);

  // Toggle a filter affiliation in local state
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
    <div className="filters-sidebar open">
      {/* Header with a title and close (X) button */}
      <div className="filters-header d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Affiliation Filters</h4>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={onClose}
          title="Close Filters"
        ></button>
      </div>

      {/* Main content */}
      <div className="filters-content p-3">
        <p className="text-muted">
          Selected affiliations will be highlighted on the graph nodes. The entire graph remains
          visible.
        </p>
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
  );
};

export default Filters;
