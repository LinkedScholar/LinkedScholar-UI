import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import { logout } from "../redux/authSlice";

const HelloUser: React.FC = () => {
    const { authenticated, username, email, firstName, lastName, picture, locale, authorities } =
        useSelector((state: RootState) => state.auth);
    const dispatch: AppDispatch = useDispatch();

    const handleLogout = async () => {
        await fetch("http://localhost:8080/api/user/logout", {
            method: "POST",
            credentials: "include",
        });
        dispatch(logout());
    };

    return (
        <div>
            {authenticated ? (
                <div>
                    <h2>Hello, {firstName} {lastName}!</h2>
                    <p><strong>Username:</strong> {username}</p>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Locale:</strong> {locale}</p>
                    <p><strong>Authorities:</strong> {authorities?.join(", ")}</p>
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
