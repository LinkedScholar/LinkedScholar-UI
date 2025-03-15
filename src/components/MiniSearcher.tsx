import React, { useState, useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../redux/store";
import { getNetwork } from "../services/ApiGatewayService";
import axios from "axios";
import RegistrationModal from "./modals/RegistrationModal";
import PricingModal from "./modals/PricingModal";
import "../styles/components/miniSearcher.scss";

const MiniSearcher: React.FC = () => {
  const navigate = useNavigate();
  const { authenticated } = useSelector((state: RootState) => state.auth);

  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [showDelayMessage, setShowDelayMessage] = useState(false);
  const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
  const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus input when the component mounts (or when needed)
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const extractProfileData = (url: string) => {
    if (url.match(/scholar\.google\.[a-z.]+/)) {
      const match = url.match(/[?&]user=([^&]+)/);
      if (match && match[1]) {
        return { author_id: match[1], source: "google" };
      }
    } else if (url.includes("researchgate.net/profile")) {
      const match = url.match(/profile\/([^/]+)/);
      if (match && match[1]) {
        return { author_id: match[1], source: "research_gate" };
      }
    } else {
      // Assume if not Google Scholar or ResearchGate, pass it to DBLP logic
      return { author_id: url, source: "dblp" };
    }
    return null;
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setShowDelayMessage(false);

    if (searchTerm.trim()) {
      const profileData = extractProfileData(searchTerm);
      if (!profileData) {
        setError("Invalid researcher profile URL.");
        return;
      }

      // Start a timer to display a delay message after 1 second
      const delayTimer = setTimeout(() => {
        setShowDelayMessage(true);
      }, 1000);

      try {
        // Note: The last parameter (1) here makes the mini searcher work as the searcher.
        const response = await getNetwork(authenticated, profileData.author_id, profileData.source, 1);
        clearTimeout(delayTimer);
        setShowDelayMessage(false);
        setSearchTerm("");
        navigate("/network", { state: { networkData: response } });
      } catch (error) {
        clearTimeout(delayTimer);
        setShowDelayMessage(false);
        if (axios.isAxiosError(error) && error.response) {
          if (error.response.status === 429 && !authenticated) {
            setIsRegistrationModalOpen(true);
            return;
          }
          if (error.response.status === 409 && authenticated) {
            setIsPricingModalOpen(true);
            return;
          }
        }
        setError("The service is unavailable. Please try later");
      }
    } else {
      setError("Enter a valid researcher name or profile URL.");
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
          {error && <p className="mini-search-error">{error}</p>}
          {showDelayMessage && (
              <div className="mini-search-delay-message">
                <p>We haven't found the researcher in our database.</p>
                <p>We are building its network, please wait...</p>
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
