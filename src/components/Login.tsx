import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {fetchSession, logout} from "../redux/authSlice";
import {AppDispatch, RootState} from "../redux/store";


const Login: React.FC = () => {
    const { authenticated, username, status } = useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSession());
    }, [dispatch]);

    const handleLogin = () => {
        window.location.href = "http://localhost:8080/oauth2/authorization/google";
    };

    const handleLogout = async () => {
        await fetch("http://localhost:8080/api/user/logout", {
            method: "POST",
            credentials: "include",
        });
        dispatch(logout());
    };

    return (
        <div>
            {status === "loading" ? (
                <p>Checking authentication...</p>
            ) : authenticated ? (
                <div>
                    <p>Welcome, {username}!</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <button onClick={handleLogin}>Login with Google</button>
            )}
        </div>
    );
};

export default Login;
