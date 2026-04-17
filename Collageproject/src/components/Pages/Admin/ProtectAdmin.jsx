import { Navigate } from "react-router-dom";

function ProtectedAdmin({ children }) {
  const isAuth = localStorage.getItem("adminToken");

  return isAuth? children : <Navigate to="/admin-login" />;
}

export default ProtectedAdmin;