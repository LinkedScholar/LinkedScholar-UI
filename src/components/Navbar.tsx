import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useLocation, Link } from 'react-router-dom';
import { RootState, AppDispatch } from "../redux/store";
import { fetchSession, logout } from "../redux/authSlice";
import '../styles/components/navbar.css';

const Navbar: React.FC = () => {
    const location = useLocation();
    const { authenticated, username, email, picture, status } = useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Fetch session on mount and when user logs in
    useEffect(() => {
        dispatch(fetchSession());
    }, [dispatch, authenticated]);

    const handleLogin = () => {
        window.location.href = "/login"; // Redirect to Login Page
    };

    const handleLogout = async () => {
        await fetch("http://localhost:8080/api/user/logout", {
            method: "POST",
            credentials: "include",
        });
        dispatch(logout());
    };

    return (
        <nav className="research-navbar">
            {/* Left Side: Brand */}
            <div className="navbar-left">
                <Link to="/" className="brand-link">
                    <div className="brand-title-container">
                        <span className="brand-title-linked">Linked</span>
                        <span className="brand-title-scholar">Scholar</span>
                    </div>
                </Link>
            </div>

            {/* Right Side: Login / Profile Dropdown */}
            <div className="navbar-right">
                {status === "loading" ? (
                    <p>Loading...</p>
                ) : authenticated ? (
                    <div className="user-profile-container">
                        <button className="user-profile-btn" onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <img src={picture || "https://via.placeholder.com/40"} alt="User" className="user-avatar" />
                        </button>

                        {dropdownOpen && (
                            <div className="user-dropdown">
                                <p><strong>{username}</strong></p>
                                <p>{email}</p>
                                <button onClick={handleLogout} className="logout-btn">Logout</button>
                            </div>
                        )}
                    </div>
                ) : (
                    <button onClick={handleLogin} className="login-btn">Sign in</button>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
