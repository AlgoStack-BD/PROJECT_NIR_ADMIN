import React, { useEffect, useState } from 'react';
import axios from 'axios';

export const AuthContext = React.createContext(null);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState('')
    const [userId, setUserId] = useState('')
    useEffect(() => {
        if (token && userId) {
            fetchUserData(token, userId);
        } else {
            setLoading(false);
        }
    }, []);

    const fetchUserData = async (token, userId) => {
        try {
            const response = await axios.get(`http://localhost:5000/single-user/${userId}`, {
                headers: {
                    Authorization: `${token}`,
                },
            });
            // console.log(response.data)
            const { name, email, isAdmin } = response.data.data;
            // set user
            setUser({ name, email, isAdmin, userId, token });
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
        setLoading(false); // Set loading state after fetching user data
    };

    const login = async (email, password) => {
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/login', {
                email,
                password,
            });

            if (response.data.status === 200) {
                const data = response.data;
                // localStorage.setItem('jwt', data.jwt);
                // localStorage.setItem('userId', data.data._id);
                setToken(data.jwt);
                setUserId(data.data._id)
                await fetchUserData(data.jwt, data.data._id);
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            console.error("Error during login:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        // invalidate token
        fetch(`http://localhost:5000/logout?jwt=${token}`,)
            .then(res => res.json())
            .then(data => console.log(data))
        setUser(null);
    };

    const authInfo = {
        user,
        loading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
