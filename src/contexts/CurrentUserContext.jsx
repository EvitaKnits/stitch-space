import { createContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import axiosClient from "../api/axiosDefaults";
import { useNavigate } from "react-router";
import { useLocation } from 'react-router-dom'; 

export const CurrentUserContext = createContext();
const publicRoutes = [
    '/',
    '/login'
];

const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const location = useLocation()

    // Attempts to get the active user, on first load
    const handleMount = async () => {
        try {
            const { data } = await axiosClient.get("dj-rest-auth/user/");
            setCurrentUser(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
        }
    };

    // Handles login
    const logIn = async (logInData) => {
        try {
            const { data } = await axios.post("/dj-rest-auth/login/", logInData);
            setCurrentUser(data.user);
            setLoading(false);
            navigate('/');
        } catch (err) {
            return err;
        }
    };

    const logOut = async () => {
        try {
            await axios.post("/dj-rest-auth/logout/");
            setLoading(true)
            setCurrentUser(null);
            navigate('/login');
        } catch (err) {
            return err;
        }
    }

    useEffect(() => {
        handleMount();
    }, []);


    useMemo(() => {
        axiosClient.interceptors.response.use(
            (response) => response,
            async (err) => {
                // If the server says the user is not logged in and needs to be to access the resource
                if (err.response?.status === 401 && !publicRoutes.includes(location.pathname)) {
                    setLoading(true)
                    setCurrentUser(null);
                    navigate('/login');
                }
                return Promise.reject(err);
            }
        );
    }, [navigate, location.pathname]);

    return (
        <CurrentUserContext.Provider value={{ currentUser, loading, logIn, logOut }}>
            {children}
        </CurrentUserContext.Provider>
    );
};

export const CurrentUserProvider = ({ children }) => <UserProvider>{children}</UserProvider>