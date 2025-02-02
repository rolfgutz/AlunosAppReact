import React from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const isAuthenticated = !!localStorage.getItem("token"); // Verifica se há token no localStorage

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}