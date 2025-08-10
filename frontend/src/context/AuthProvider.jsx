import { useState, createContext, useContext, useEffect, useLayoutEffect } from 'react'
import { APIContext } from './contexts.js';
import { AuthContext } from './contexts.js';


export default function AuthProvider({ children }) {

    // this variable is needed to detect a loop happening when the refresh token call returns unauthorised
    // so another request is ran again
    let RanRequest = false

    const { client } = useContext(APIContext)

    const defaultUser = {
        "email": "",
        "first_name": "",
        "last_name": "",
        "is_staff": false,
        "logged_in": false
    }

    const [user, setUser] = useState(defaultUser)
    const [accessToken, setAccessToken] = useState(null)

    const [loading, setLoading] = useState(true)

    function loginHandler(tokens) {
        setLoading(true)
        setAccessToken(tokens.access)
        localStorage.setItem('refresh', tokens.refresh)
        getUserInfo()
    }

    function logoutHandler() {
        setLoading(true)
        setAccessToken(null)
        setUser(defaultUser)
        localStorage.removeItem('refresh')
        setLoading(false)
    }

    function getUserInfo() {
        setLoading(true)
        client.get('me/').then((response) => {
            setUser({
                ...response.data.user,
                "logged_in": true,
            })
            setLoading(false)
        })
            .catch((error) => {
                setUser(defaultUser)
                setLoading(false)
            })
    }


    // this changes each API call from the frontend to include the token if it exists
    useLayoutEffect(() => {
        const authInterceptor = client.interceptors.request.use((config) => {
            config.headers['Authorization'] =
                !config._retry && accessToken
                    ? `Bearer ${accessToken}`
                    : config.headers['Authorization']
            return config
        })
        return () => client.interceptors.request.eject(authInterceptor)
    }, [accessToken])

    // this is used to refresh the token if it expires by detecting an unauthorized request
    useLayoutEffect(() => {

        const refreshInterceptor = client.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalRequest = error.config
                if (error.response && error.response.status === 401 && RanRequest === false) {
                    setLoading(true)
                    try {
                        RanRequest = true
                        const response = await client.post('auth/token/refresh/', {
                            refresh: localStorage.getItem('refresh')
                        })
                        RanRequest = false
                        setLoading(false)
                        if (response.status === 200) {
                            setAccessToken(response.data.access)

                            originalRequest.headers['Authorization'] = `Bearer ${response.data.access}`
                            originalRequest._retry = true
                            return client(originalRequest)
                        }
                        else {
                            setAccessToken(null)
                            localStorage.removeItem('refresh')
                        }
                    } catch (_error) {
                        setAccessToken(null)
                        localStorage.removeItem('refresh')
                    }
                }
                RanRequest = false
                // returns the unknown error 
                return Promise.reject(error)
            }
        )

        return () => client.interceptors.response.eject(refreshInterceptor)
    }, [])

    useEffect(() => {
        if (localStorage.getItem('refresh')) {
            getUserInfo()
        }
        else {
            setLoading(false)
        }
    }, [])

    return (
        <AuthContext value={{ accessToken, setAccessToken, user, loginHandler, logoutHandler, loading, setLoading }}>
            {children}
        </AuthContext>
    )
}

