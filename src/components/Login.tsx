import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {fetchSession, logout} from "../redux/authSlice";
import {AppDispatch, RootState} from "../redux/store";
import {useNavigate} from "react-router-dom";


const Login: React.FC = () => {
    const { authenticated, username, status } = useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchSession());
    }, [dispatch]);

    const handleLogin = () => {
        let the_string = process.env.REACT_APP_BASE_URL || "http://localhost:8080";
        window.location.href = the_string + "/oauth2/authorization/google";
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
