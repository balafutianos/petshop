// src/Frontend/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const ProtectedRoute = ({ children }) => {
  const { user, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) return <p style={{ padding: 16 }}>Loading…</p>;
  if (!user) return <Navigate to="/signin" replace state={{ from: location }} />;

  return children;
};

export default ProtectedRoute;
