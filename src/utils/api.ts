import axios, { AxiosInstance, AxiosResponse } from "axios";

const api: AxiosInstance = axios.create({
	baseURL: "http://127.0.0.1:8000",
});

api.interceptors.response.use(
	(response: AxiosResponse) => response,
	(error: any) => {
		if (401 === error.response.status) {
			window.location.href = "/";
		} else {
			return Promise.reject(error);
		}
	}
);

export { api };
