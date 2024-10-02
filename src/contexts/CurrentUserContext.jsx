import axios from 'axios'
import { createContext, useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom'

import axiosClient from '../api/axiosDefaults'

export const CurrentUserContext = createContext()
const publicRoutes = ['/', '/login']

const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()
    const location = useLocation()

    // Attempts to get the active user, on first load
    const handleMount = async () => {
        try {
            const { data } = await axiosClient.get('dj-rest-auth/user/')
            setCurrentUser(data)

        } catch (err) {
            console.error(err)
        }
        finally {
            setLoading(false)
        }
    }

    // Handles login
    const logIn = async (logInData) => {
        const { data } = await axios.post('/dj-rest-auth/login/', logInData)
        setCurrentUser(data.user)
        setLoading(false)
        navigate('/')

    }

    // Handles logout
    const logOut = async () => {
        try {
            await axios.post('/dj-rest-auth/logout/')
            setLoading(true)
            setCurrentUser(null)
            navigate('/login')
        } catch (err) {
            return err
        }
    }

    useEffect(() => {
        handleMount()
    }, [])

    useMemo(() => {
        axiosClient.interceptors.response.use(
            (response) => response,
            async (err) => {
                // If the server says the user is not logged in and needs to be to access the resource
                if (
                    err.response?.status === 401 &&
                    !publicRoutes.includes(location.pathname)
                ) {
                    setLoading(true)
                    setCurrentUser(null)
                    navigate('/login')
                }
                return Promise.reject(err)
            }
        )
    }, [navigate, location.pathname])

    return (
        <CurrentUserContext.Provider
            value={{ currentUser, loading, logIn, logOut }}
        >
            {children}
        </CurrentUserContext.Provider>
    )
}

export const CurrentUserProvider = ({ children }) => (
    <UserProvider>{children}</UserProvider>
)
