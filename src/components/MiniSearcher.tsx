import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
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
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showDelayMessage, setShowDelayMessage] = useState(false);

  const inputWrapperRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    searchInputRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (inputWrapperRef.current && !inputWrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { search, error, loading, suggestions, fetchSuggestions } = useResearcherSearch(authenticated);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(false);
    setLocalError("");
    const delayTimer = setTimeout(() => {
      setShowDelayMessage(true);
    }, 300);

    try {
      const result = await search(searchTerm);
      clearTimeout(delayTimer);
      setShowDelayMessage(false);
      if (!result) return;

      if (result.status === 204) return;

      if (result.data) {
        setSearchTerm("");
        navigate("/network", {
          state: { networkData: result.data, centerId: result.centerId, status: result.status },
        });
      }
    } catch (err: any) {
      clearTimeout(delayTimer);
      setShowDelayMessage(false);

      if (err.code === 429) return setIsRegistrationModalOpen(true);
      if (err.code === 409) return setIsPricingModalOpen(true);
      setLocalError(error);
    }
  };

  return (
      <>
        <div className="mini-searcher-container">
          <form onSubmit={handleSearch} className="mini-search-form">
            <div className="search-input-wrapper" ref={inputWrapperRef}>
              <i className="mdi mdi-magnify search-icon"></i>
              <input
                  ref={searchInputRef}
                  type="text"
                  className="mini-search-input"
                  placeholder="Search researchers..."
                  value={searchTerm}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSearchTerm(value);
                    fetchSuggestions(value);
                    setShowSuggestions(true);
                  }}
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
              <button
                  type="submit"
                  className={`mini-search-button ${loading ? "loading" : ""}`}
                  disabled={loading}
              >
                {loading ? (
                    <>
                      <svg
                          className="spinner-icon"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                      >
                        <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                        />
                        <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Loading...
                    </>
                ) : (
                    "Search"
                )}
              </button>

              {showSuggestions && suggestions.length > 0 && (
                  <div className="mini-suggestions-list">
                    {suggestions.map((name, i) => (
                        <div
                            key={i}
                            className="mini-suggestion-item"
                            onClick={() => {
                              setSearchTerm(name);
                              setShowSuggestions(false);
                            }}
                        >
                          {name}
                        </div>
                    ))}
                  </div>
              )}
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
