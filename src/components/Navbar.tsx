import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { RootState, AppDispatch } from "../redux/store";
import { fetchSession, logout } from "../redux/authSlice";
import { persistStore } from "redux-persist";
import { store } from "../redux/store";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/components/navbar.scss";

const Navbar: React.FC = () => {
    const { authenticated, firstName, lastName, email, status } = useSelector(
        (state: RootState) => state.auth
    );
    const dispatch: AppDispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    useEffect(() => {
        if (status === "idle" && !authenticated) {
            dispatch(fetchSession()).catch(() => {
                console.log("Error fetching session");
            });
        }
    }, [dispatch, status, authenticated]);


    const handleLogin = () => {
        window.location.href = "/login";
    };

    const handleLogout = async () => {
        await fetch("http://localhost:8080/api/user/logout", {
            method: "POST",
            credentials: "include",
        });

        dispatch(logout());
        persistStore(store).purge(); // ✅ Clear Redux Persist data on logout
    };

    return (
        <nav className="navbar navbar-expand-lg glass-navbar">
            <div className="container">
                {/* Brand Logo */}
                <Link className="navbar-brand brand-title" to="/">
                    Linked <span>Scholar</span>
                </Link>

                {/* Navbar Toggler for Mobile */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Navbar Items */}
                <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                    {status === "loading" ? (
                        <p className="loading-text">Loading...</p>
                    ) : status === "failed" ? (
                        <p className="error-text text-danger">Network Error</p>
                    ) : authenticated ? (
                        <div className="dropdown">
                            <button
                                className="btn profile-btn dropdown-toggle d-flex align-items-center"
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                            >
                                {firstName && lastName ? `${firstName} ${lastName}` : "Profile"}
                            </button>

                            {dropdownOpen && (
                                <ul className="dropdown-menu show">
                                    <li className="dropdown-item text-muted">{email}</li>
                                    <li>
                                        <button className="dropdown-item text-danger" onClick={handleLogout}>
                                            Logout
                                        </button>
                                    </li>
                                </ul>
                            )}
                        </div>
                    ) : (
                        <button className="btn login-btn" onClick={handleLogin}>
                            Sign in
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
