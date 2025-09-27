import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { fetchSession } from "../redux/authSlice";
import RegistrationModal from "../components/modals/RegistrationModal";
import LandingPage from "../components/LandingPage";
import { useResearcherSearch } from "../utils/searchUtility";
import { registerErrorHandlers } from "../utils/errorHandler";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/views/searcher.scss";

interface SearcherProps {
    clientId: string;
}

const Searcher: React.FC<SearcherProps> = ({ clientId }) => {
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
        registerErrorHandlers(
            setIsRegistrationModalOpen,
        );
    }, []);

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

    const { search, error, loading, suggestions, isRateLimited, fetchSuggestions } = useResearcherSearch(authenticated);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError("");
        setShowSuggestions(false);
        setShowDelayMessage(false);

        if (isRateLimited) {
            return;
        }

        const delayTimer = setTimeout(() => {
            setShowDelayMessage(true);
        }, 1000);

        try {
            const result = await search(searchTerm, clientId);
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

            if (err.code !== 429 && err.code !== 409) {
                setLocalError(err.message || error);
            }
        }
    };

    return (
        <div className="search-page">
            <LandingPage />
        </div>
    );
};

export default Searcher;
