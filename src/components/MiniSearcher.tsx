import React, { useState } from "react";
import "../styles/components/miniSearcher.scss";

const MiniSearcher: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [error, setError] = useState("");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (searchTerm.trim()) {
            alert("Perform search logic here!"); // Replace with real logic
        } else {
            setError("Enter a valid researcher name or profile URL.");
        }
    };

    return (
        <div className={`mini-searcher-container ${isOpen ? "open" : ""}`}>
            {!isOpen ? (
                <button className="new-search-button" onClick={() => setIsOpen(true)}>
                    <i className="mdi mdi-magnify"></i> New Search
                </button>
            ) : (
                <div className="mini-searcher">
                    <form onSubmit={handleSearch} className="mini-search-form">
                        <input
                            type="text"
                            className="mini-search-input"
                            placeholder="Search researchers..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <button type="submit" className="mini-search-button">
                            <i className="mdi mdi-magnify"></i>
                        </button>
                        <button type="button" className="mini-search-close" onClick={() => setIsOpen(false)}>
                            <i className="mdi mdi-close"></i>
                        </button>
                    </form>
                    {error && <p className="mini-search-error">{error}</p>}
                </div>
            )}
        </div>
    );
};

export default MiniSearcher;
