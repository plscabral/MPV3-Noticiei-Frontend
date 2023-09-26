import jwtDecode from "jwt-decode";

import { api } from "./api";

const isValidToken = (token: string) => {
	if (!token) {
		return false;
	}
	const decoded = jwtDecode<{ exp: number }>(token);

	const currentTime = Date.now() / 1000;

	return decoded.exp > currentTime;
};

const handleTokenExpired = (exp: number) => {
	let expiredTimer;

	const currentTime = Date.now();

	// Test token expires after 10s
	// const timeLeft = currentTime + 10000 - currentTime; // ~10s
	const timeLeft = exp * 1000 - currentTime;

	clearTimeout(expiredTimer);

	expiredTimer = setTimeout(() => {
		localStorage.removeItem("token");

		window.location.href = "/";
	}, timeLeft);
};

const setSession = (token: string | null) => {
	if (token) {
		localStorage.setItem("token", token);
		api.defaults.headers.common.Authorization = `Bearer ${token}`;

		// This function below will handle when token is expired
		const { exp } = jwtDecode<{ exp: number }>(token); // ~5 days by minimals server
		handleTokenExpired(exp);
	} else {
		localStorage.removeItem("token");
		delete api.defaults.headers.common.Authorization;
	}
};

export { isValidToken, setSession };
