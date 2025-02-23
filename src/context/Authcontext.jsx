import { createContext, useState, useEffect } from "react";
import axiosInstance from "../api/axiosInstance.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(() => {
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        return accessToken && refreshToken ? { accessToken, refreshToken } : null;
    });
    
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (token) {
            localStorage.setItem("accessToken", token?.accessToken);
            localStorage.setItem("refreshToken", token?.refreshToken);
            fetchUserProfile();
        } else {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            setUser(null);
        }
    }, [token]);

    useEffect(()=>{
        console.log("token changed",token);
        console.log("user changed:",user);
        
    },[token,user])

    const fetchUserProfile = async () => {
        try {
            setLoading(true)
            const response = await axiosInstance.get("/auth/me");
            console.log("ran fetch user",response.data);
            
            setUser(response.data);
        } catch (error) {
            console.error("Error fetching user:", error);
            setToken(null);
            setUser(null);
        }finally{
            setLoading(false)
        }
    };

    const signUp = async (email, password) => {
        try {
            const response = await axiosInstance.post("/auth/signup", { email, password });
            // setToken(response.data);
            return { success: true, message: "Sign up successful!" };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Signup failed" };
        }
    };

    const login = async (email, password) => {
        console.log("in Auth",email,password);
        
        try {
            const response = await axiosInstance.post("/auth/login", { email, password });
            console.log(response);
            const token = {accessToken:response.data.data?.accessToken,refreshToken:response.data.data?.refreshToken};
            
            setToken(token);
            return { success: true, message: "Login successful!" };
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Invalid credentials" };
        }
    };

    const logout = async () => {
        try {
            const response = await axiosInstance.post("/auth/logout");
            console.log(response);
        } catch (error) {
            return { success: false, message: error.response?.data?.message || "Logout failed" };
            
        }
        setToken(null);
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    };

    return (
        <AuthContext.Provider value={{ user, signUp, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
