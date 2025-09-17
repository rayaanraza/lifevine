import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./AuthenticationContext";
import Login from "./Login";
import Register from "./Register";
import Header from "./header/Header";
import Dashboard from "./Dashboard";
import ProtectedRoute from "./ProtectedRoute";
import "./App.css";

export default function App() {
  return (
  <div>
    <Header />
    <Dashboard />
    react shmeact
  </div>
    // <AuthProvider>
    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/" element={<Navigate to="/dashboard" replace />} />
    //       <Route path="/login" element={<Login />} />
    //       <Route path="/register" element={<Register />} />
    //       <Route
    //         path="/dashboard"
    //         element={
    //           <ProtectedRoute>
    //             <Dashboard />
    //           </ProtectedRoute>
    //         }
    //       />
    //       <Route path="*" element={<Navigate to="/dashboard" replace />} />
    //     </Routes>
    //   </BrowserRouter>
    // </AuthProvider>
  );
}
