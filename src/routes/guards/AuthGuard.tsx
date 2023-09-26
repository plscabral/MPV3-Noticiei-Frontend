import { useState } from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

// hookd
import { useAuth } from "../../hooks/useAuth";

export function AuthGuard() {
	const { isLoading, isAuthenticated } = useAuth();

	const { pathname } = useLocation();

	const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

	if (isLoading) {
		return <h1>Loading ...</h1>;
	}

	if (!isAuthenticated) {
		if (pathname !== requestedLocation) {
			setRequestedLocation(pathname);
		}
		return <Navigate to="/" replace />;
	}

	if (requestedLocation && pathname !== requestedLocation) {
		setRequestedLocation(null);
		return <Navigate to={requestedLocation} />;
	}

	return <Outlet />;
}
