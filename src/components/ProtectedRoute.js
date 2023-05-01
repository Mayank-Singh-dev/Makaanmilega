import React from "react";
import { Navigate } from "react-router-dom";
import { useStateValue } from "../context/Stateprovider";

const ProtectedRoute = ({ children }) => {
  const {user}  = useStateValue()[0];
  if (!user || user.email !== "mayankphenomuraaaa@gmail.com") {
    console.log(user?.email);
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;

