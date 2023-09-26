import { Navigate, Outlet } from "react-router-dom";

// hooks
import { useAuth } from "../../hooks/useAuth";

export function GuestGuard() {
	const { isAuthenticated } = useAuth();

	if (isAuthenticated) {
		return <Navigate to={"/termos"} />;
	}

	return <Outlet />;
}
