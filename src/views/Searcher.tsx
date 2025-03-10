import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchSession } from "../redux/authSlice";
import axios from "axios";
import { getNetwork } from "../components/services/ApiGatewayService";
import RegistrationModal from "../components/modals/RegistrationModal";
import PricingModal from "../components/modals/PricingModal";

import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/views/searcher.scss";

const Searcher: React.FC = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    const { authenticated, status } = useSelector((state: RootState) => state.auth);

    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState("");

    const [isPricingModalOpen, setIsPricingModalOpen] = useState(false);
    const [isRegistrationModalOpen, setIsRegistrationModalOpen] = useState(false);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchSession());
        }
    }, [dispatch, status]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (searchTerm.trim()) {
            try {
                const response = await getNetwork(authenticated, searchTerm, "google", 0);
                navigate("/network", { state: { networkData: response, loading: false } });
            } catch (error) {
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
                setError("Failed to fetch network data. Please try again.");
            }
        } else {
            setError("Enter a valid researcher name or profile URL.");
        }
    };

    return (
        <div className="menu-container">
            <div className="menu-content">
                <header className="menu-header">
                    <div className="title-container">
                        <h1 className="title-linked">Linked</h1>
                        <h1 className="title-scholar">Scholar</h1>
                    </div>
                    <span className="menu-version">v1.0</span>
                </header>

                <p className="search-info">Find and analyze researcher networks with ease.</p>

                <form onSubmit={handleSearch} className="search-container">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search for researchers..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </form>

                <div className="search-buttons">
                    <button type="submit" className="search-button" onClick={handleSearch}>
                        Search
                    </button>
                    <button type="button" className="search-button" onClick={() => setSearchTerm("")}>
                        Clear
                    </button>
                </div>

                {error && <p className="error-message">{error}</p>}
            </div>

            <RegistrationModal isOpen={isRegistrationModalOpen} onClose={() => setIsRegistrationModalOpen(false)} />
            <PricingModal isOpen={isPricingModalOpen} onClose={() => setIsPricingModalOpen(false)} />
        </div>
    );
};

export default Searcher;
