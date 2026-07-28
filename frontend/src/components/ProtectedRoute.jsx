import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function ProtectedRoute({ children, allowedRole }) {
  const token = localStorage.getItem("token");

  // 1. User not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    // 2. Decode JWT
    const decoded = jwtDecode(token);

    // JWT payload contains user_role
    const role = decoded.user_role;

    // 3. Check role
    if (allowedRole && role !== allowedRole) {
      if (role === "CLIENT") {
        return <Navigate to="/client" replace />;
      } else if (role === "FREELANCER") {
        return <Navigate to="/freelancer" replace />;
      } else {
        localStorage.clear();
        return <Navigate to="/login" replace />;
      }
    }

    // 4. Authorized
    return children;
  } catch (error) {
    console.error("Invalid JWT:", error);

    // Invalid or tampered token
    localStorage.clear();
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRoute;