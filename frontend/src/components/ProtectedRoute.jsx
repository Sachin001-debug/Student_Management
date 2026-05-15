import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ allowedRole, children }) => {
 
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role")

    // user not logged in
  if (!token) {
    return <Navigate to="/" replace />;
  }

  // wrong role
  if (role !== allowedRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;