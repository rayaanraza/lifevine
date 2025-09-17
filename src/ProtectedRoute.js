import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthenticationContext";

export default function ProtectedRoute({ children }) {
  const { user, initializing } = useAuth();
  if (initializing) return null; // or a spinner
  return user ? children : <Navigate to="/login" replace />;
}
