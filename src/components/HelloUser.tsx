import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { logout } from "../redux/authSlice";
import {useNavigate} from "react-router-dom";

const HelloUser: React.FC = () => {
    const { authenticated, username, email, firstName, lastName, picture } =
        useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch();

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
            {authenticated ? (
                <div>
                    <h2>Hello, {firstName} {lastName}!</h2>
                    <p><strong>Username:</strong> {username}</p>
                    <p><strong>Email:</strong> {email}</p>
                    {picture && <img src={picture} alt="Profile" width="80" style={{ borderRadius: "50%" }} />}
                    <br />
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <p>Please log in.</p>
            )}
        </div>
    );
};

export default HelloUser;
