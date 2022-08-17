import { Navigate, useLocation } from "react-router-dom";
import { authProvider } from "../api/AuthApi";

export function RequireAuth({ children }: { children: JSX.Element }) {
    let location = useLocation();

    if (!authProvider.isLoggedIn()) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
