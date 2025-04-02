import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchSession } from "../redux/authSlice";
import axios from "axios";
import RegistrationModal from "../components/modals/RegistrationModal";
import PricingModal from "../components/modals/PricingModal";
import { toast } from "react-toastify";
import { useResearcherSearch } from "../utils/searchUtility";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/views/searcher.scss";

const Searcher: React.FC = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const { authenticated, status } = useSelector((state: RootState) => state.auth);

    const [searchTerm, setSearchTerm] = useState("");
    const [localError, setLocalError] = useState("");

    const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchSession());
        }
    }, [dispatch, status]);

    const { search, error, loading } = useResearcherSearch(authenticated);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError("");
        try {
            const result = await search(searchTerm);
            if (result && result.data) {
                // If the status is 404, the toast is already shown in the hook.
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
            // Use local error state if needed.
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
                <div className="search-bar">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search for researchers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
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
