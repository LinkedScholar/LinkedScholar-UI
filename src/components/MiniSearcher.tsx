import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import axios from "axios";
import RegistrationModal from "./modals/RegistrationModal";
import PricingModal from "./modals/PricingModal";
import { useResearcherSearch } from "../utils/searchUtility";
import "../styles/components/miniSearcher.scss";

const MiniSearcher: React.FC = () => {
  const navigate = useNavigate();
  const { authenticated } = useSelector((state: RootState) => state.auth);

  const [searchTerm, setSearchTerm] = useState("");
  const [localError, setLocalError] = useState("");

  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);

  const searchInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  const { search, error, loading } = useResearcherSearch(authenticated);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    try {
      const result = await search(searchTerm);
      if (result && result.data) {
        setSearchTerm("");
        // Pass same structure as in Searcher: networkData, centerId and status.
        navigate("/network", {
          state: { networkData: result.data, centerId: result.centerId, status: result.status },
        });
      }
    } catch (err: any) {
      if (err.code === 429) {
        setIsRegistrationModalOpen(true);
        return;
      }
      if (err.code === 409) {
        setIsPricingModalOpen(true);
        return;
      }
      setLocalError(error);
    }
  };

  return (
      <>
        <div className="mini-searcher-container">
          <form onSubmit={handleSearch} className="mini-search-form">
            <div className="search-input-wrapper">
              <i className="mdi mdi-magnify search-icon"></i>
              <input
                  ref={searchInputRef}
                  type="text"
                  className="mini-search-input"
                  placeholder="Search researchers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                  <button
                      type="button"
                      className="mini-search-clear"
                      onClick={() => setSearchTerm("")}
                  >
                    <i className="mdi mdi-close"></i>
                  </button>
              )}
              <button type="submit" className="mini-search-button">
                Search
              </button>
            </div>
          </form>
          {localError && <p className="mini-search-error">{localError}</p>}
          {loading && (
              <div className="mini-search-delay-message">
                <p>We are building the network, please wait...</p>
              </div>
          )}
        </div>

        <RegistrationModal
            isOpen={isRegistrationModalOpen}
            onClose={() => setIsRegistrationModalOpen(false)}
        />
        <PricingModal
            isOpen={isPricingModalOpen}
            onClose={() => setIsPricingModalOpen(false)}
        />
      </>
  );
};

export default MiniSearcher;
