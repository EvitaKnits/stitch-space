import { createContext, useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import axiosClient from "../api/axiosDefaults";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

export const CurrentUserContext = createContext();

export const setTokenTimestamp = (data) => {
    const refreshTokenTimestamp = jwtDecode(data?.refresh_token).exp;
    localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
};

const shouldRefreshToken = () => {
    return !!localStorage.getItem("refreshTokenTimestamp");
};

const removeTokenTimestamp = () => {
    localStorage.removeItem("refreshTokenTimestamp");
};

const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const navigate = useNavigate();

    // Attempts to get the active user, on first load
    const handleMount = async () => {
        try {
            const { data } = await axiosClient.get("dj-rest-auth/user/");
            setCurrentUser(data);
        } catch (err) {
            console.log(err);
        }
    };

    // Handles login
    const logIn = async (logInData) => {
        try {
            const { data } = await axios.post("/dj-rest-auth/login/", logInData);
            setCurrentUser(data.user);
            setTokenTimestamp(data);
            navigate(-1);
        } catch (err) {
            return err.response?.data;
        }
    };

    const logOut = () => {
        removeTokenTimestamp();
        setCurrentUser(null);
    }

    useEffect(() => {
        handleMount();
    }, []);

    // This code block is executed with every request made with Axios
    useMemo(() => {
        axiosClient.interceptors.request.use(
            async (config) => {
                // Check if the token is due to have expired
                if (shouldRefreshToken()) {
                    try {
                        // Request a new token
                        await axios.post("/dj-rest-auth/token/refresh/");
                    } catch (err) {
                        setCurrentUser((prevCurrentUser) => {
                            if (prevCurrentUser) {
                                history.push("/signin");
                            }
                            return null;
                        });
                        removeTokenTimestamp();
                        return config;
                    }
                }
                return config;
            },
            (err) => {
                return Promise.reject(err);
            }
        );

        // On every response Axios receives
        axiosClient.interceptors.response.use(
            (response) => response,
            async (err) => {
                // If the server says the user is not logged in and needs to be to access the resource
                if (err.response?.status === 401) {
                    try {
                        // Try to get a new token
                        await axios.post("/dj-rest-auth/token/refresh/");
                    } catch (err) {
                        setCurrentUser((prevCurrentUser) => {
                            if (prevCurrentUser) {
                                history.push("/signin");
                            }
                            return null;
                        });
                        removeTokenTimestamp();
                    }
                    return axios(err.config);
                }
                return Promise.reject(err);
            }
        );
    }, [history]);

    return (
        <CurrentUserContext.Provider value={{ currentUser, logIn, logOut }}>
            {children}
        </CurrentUserContext.Provider>
    );
};

// Code for local development: Start

const devUser = {
    pk: 1,
    username: "evita",
    email: "evita.orrock@gmail.com",
    first_name: "Evita",
    last_name: "Orrock"
}

const DevelopmentUserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => {
        const isLoggedOut = localStorage.getItem("devUserLoggedOut") === "true";
        return isLoggedOut ? null : devUser;
    });

    const logIn = useCallback(() => {
        setCurrentUser(devUser);
        localStorage.removeItem("devUserLoggedOut");
        console.log("Development User Signed In");
    }, []);

    const logOut = useCallback(() => {
        setCurrentUser(null);
        localStorage.setItem("devUserLoggedOut", "true");
        console.log("Development User Logged Out");
    }, []);

    useEffect(() => {
        if (!currentUser && localStorage.getItem("devUserLoggedOut") !== "true") {
            logIn();
        }
    }, [currentUser, logIn]);

    return (
        <CurrentUserContext.Provider value={{ currentUser, logIn, logOut }}>
            {children}
        </CurrentUserContext.Provider>
    );
};

// Code for local development: End

export const CurrentUserProvider = ({ children }) => (import.meta.env.DEV) ?
    <DevelopmentUserProvider>{children}</DevelopmentUserProvider>
    : <UserProvider>{children}</UserProvider>