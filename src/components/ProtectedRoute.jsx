import { Navigate, Outlet } from "react-router-dom";
import { getAuth } from "firebase/auth";

const ProtectedRoute = () => {
    const auth = getAuth(); 
    const user = auth.currentUser; // ✅ Get current user directly from Firebase

    return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
