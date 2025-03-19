import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { RootState, AppDispatch } from "../redux/store";
import { fetchSession, logout } from "../redux/authSlice";
import MiniSearcher from "./MiniSearcher"; // Import MiniSearcher component
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/components/navbar.scss";

const Navbar: React.FC = () => {
    const { authenticated, firstName, lastName, email, status } = useSelector(
        (state: RootState) => state.auth
    );
    const dispatch: AppDispatch = useDispatch();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const location = useLocation();
    
    const isNetworkPage = location.pathname === "/network";

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchSession())
                .unwrap()
                .catch(() => console.error("❌ Error fetching session"));
        }
    }, [dispatch, status]);

    useEffect(() => {
        console.log("Redux Auth State:", { authenticated, firstName, lastName, email, status });
    }, [authenticated, status]);

    const handleLogin = () => {
        window.location.href = "/login";
    };

    const navigate = useNavigate();

    const handleLogout = async () => {
        let the_string = process.env.REACT_APP_BASE_URL || "http://localhost:8080";
        await fetch(the_string + "/api/user/logout", {
            method: "POST",
            credentials: "include",
        });
        dispatch(logout());
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg glass-navbar">
          <div className="container">
            {/* Left: Brand Logo */}
            <div className="navbar-brand-container">
              <Link className="navbar-brand brand-title" to="/">
                Linked <span>Scholar</span>
              </Link>
            </div>
      
            {/* Center: Search Bar - only on network page */}
            {isNetworkPage && (
              <div className="navbar-search-wrapper d-none d-md-flex">
                <MiniSearcher />
              </div>
            )}
      
            {/* Right: Authentication */}
            <div className="navbar-nav-container">
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
      
              <div className="collapse navbar-collapse d-none" id="navbarNav">
                {status === "loading" ? (
                  <p className="loading-text">Loading...</p>
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
                    Sign In
                  </button>
                )}
              </div>
            </div>
            
            {/* Mobile Search Bar - shown below navbar on small screens */}
            {isNetworkPage && (
              <div className="navbar-search-mobile d-md-none w-100 mt-2">
                <MiniSearcher />
              </div>
            )}
          </div>
        </nav>
      );
}

export default Navbar;