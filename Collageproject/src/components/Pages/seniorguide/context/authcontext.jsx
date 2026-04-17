// src/context/AuthContext.js
import React, { createContext, useState, useContext, useEffect } from "react";
import { getCurrentUserProfile } from "../Apiroute";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const adminToken = localStorage.getItem("adminToken");
    if (token || adminToken) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getCurrentUserProfile();
      setUser(res.data);
      setRole(res.data.role);
    } catch (err) {
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = (token, userRole, userId) => {
    localStorage.setItem("token", token);
    setRole(userRole);
    fetchProfile();
  };

  const adminLogin = (token) => {
    localStorage.setItem("adminToken", token);
    setRole("admin");
    fetchProfile();
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminToken");
    setUser(null);
    setRole(null);
    window.location.href = "/login";
  };

  return (
    <AuthContext.Provider value={{ user, role, loading, login, adminLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};