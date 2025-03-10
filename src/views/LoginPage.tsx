import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchSession } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import '../styles/views/login-page.css';

const LoginPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { authenticated } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    // Fetch user session when this page loads
    useEffect(() => {
        dispatch(fetchSession());
    }, [dispatch]);

    // If user is authenticated, redirect to home
    useEffect(() => {
        if (authenticated) {
            navigate("/");
        }
    }, [authenticated, navigate]);

    const handleLogin = (provider: string) => {
        window.location.href = `http://localhost:8080/oauth2/authorization/${provider}`;
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2>Welcome to Linked Scholar</h2>
                <p>Sign in using one of the following providers:</p>

                <button className="sso-btn google-btn" onClick={() => handleLogin("google")}>
                    <img src="/icons/google.svg" alt="Google" /> Sign in with Google
                </button>
                <button className="sso-btn github-btn" onClick={() => handleLogin("github")}>
                    <img src="/icons/github.svg" alt="GitHub" /> Sign in with GitHub
                </button>
                <button className="sso-btn microsoft-btn" onClick={() => handleLogin("microsoft")}>
                    <img src="/icons/microsoft.svg" alt="Microsoft" /> Sign in with Microsoft
                </button>

                <p className="disclaimer">By signing in, you agree to our <a href="/terms">Terms of Service</a>.</p>
            </div>
        </div>
    );
};

export default LoginPage;
