import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchSession } from "../redux/authSlice";
import RegistrationModal from "../components/modals/RegistrationModal";
import PricingModal from "../components/modals/PricingModal";
import { useResearcherSearch } from "../utils/searchUtility";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/views/searcher.scss";

const Searcher: React.FC = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const { authenticated, status } = useSelector((state: RootState) => state.auth);
    const [showDelayMessage, setShowDelayMessage] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [localError, setLocalError] = useState("");
    const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const searchBarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchSession());
        }
    }, [dispatch, status]);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (searchBarRef.current && !searchBarRef.current.contains(e.target as Node)) {
                setShowSuggestions(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const { search, error, loading, suggestions, fetchSuggestions } = useResearcherSearch(authenticated);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError("");
        setShowSuggestions(false);
        setShowDelayMessage(false); // reset before starting

        const delayTimer = setTimeout(() => {
            setShowDelayMessage(true);
        }, 1000);

        try {
            const result = await search(searchTerm);
            clearTimeout(delayTimer);
            setShowDelayMessage(false);

            if (!result) return;

            if (result.status === 204) return;

            if (result.data) {
                navigate("/network", {
                    state: {
                        networkData: result.data,
                        centerId: result.centerId,
                        status: result.status,
                    },
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
        <div className="search-page">
            <header className="search-header">
                <div className="title-container">
                    <h1 className="title">
                        <span className="title-linked">Linked</span>
                        <span className="title-scholar">Scholar</span>
                    </h1>
                    <span className="version-text">α</span>
                </div>
                <p className="search-info">Find and analyze researcher networks with ease.</p>
            </header>

            <form onSubmit={handleSearch} className="mb-3 search-container">
                <div className="search-bar" ref={searchBarRef}>
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search for researchers..."
                        value={searchTerm}
                        onChange={(e) => {
                            const value = e.target.value;
                            setSearchTerm(value);
                            fetchSuggestions(value);
                            setShowSuggestions(true);
                        }}
                    />
                    {showSuggestions && suggestions.length > 0 && (
                        <div className="suggestions-list">
                            {suggestions.map((name, i) => (
                                <div
                                    key={i}
                                    className="suggestion-item"
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

            <div className="search-buttons">
                <button type="submit" className="search-button" onClick={handleSearch}>
                    Search
                </button>
                <button
                    type="button"
                    className="search-button-secondary"
                    onClick={() => setSearchTerm("")}
                >
                    Clear
                </button>
            </div>

            {(localError || error) && <p className="error-message">{localError || error}</p>}

            {loading && (
                <div className="delay-message">
                    <p>Building Researcher Network</p>
                    <p>Please wait while we analyze the connections</p>
                </div>
            )}

            <div className="d-none mt-5 alert alert-warning text-center" role="alert">
                We are experiencing issues with some researcher data.
                <br />
                You might find unexpected behavior. We are currently working to fix it.
            </div>

            <RegistrationModal
                isOpen={isRegistrationModalOpen}
                onClose={() => setIsRegistrationModalOpen(false)}
            />
            <PricingModal
                isOpen={isPricingModalOpen}
                onClose={() => setIsPricingModalOpen(false)}
            />
        </div>
    );
};

export default Searcher;
