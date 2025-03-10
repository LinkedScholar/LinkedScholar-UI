import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { fetchSession } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";
import '../styles/views/login-page.scss';

const LoginPage: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { authenticated } = useSelector((state: RootState) => state.auth);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchSession());
    }, [dispatch]);

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
            <h1 className="title">
                <span className="title-linked">Linked</span>
                <span className="title-scholar">Scholar</span>
            </h1>
            <p className="login-subtitle">Sign in to explore and analyze researcher networks.</p>

            <button className="sso-btn google-btn" onClick={() => handleLogin("google")}>
                <img src="/icons/google.svg" alt="Google" className="sso-icon" /> Sign in with Google
            </button>
            <button className="sso-btn google-btn" onClick={() => handleLogin("github")}>
                <img src="/icons/github.svg" alt="GitHub" className="sso-icon" /> Sign in with GitHub
            </button>
            <button className="sso-btn  google-btn" onClick={() => handleLogin("microsoft")}>
                <img src="/icons/microsoft.svg" alt="Microsoft" className="sso-icon" /> Sign in with Microsoft
            </button>

            <p className="disclaimer">
                By signing in, you agree to our <a href="/terms">Terms of Service</a>.
            </p>
        </div>
    );
};

export default LoginPage;
