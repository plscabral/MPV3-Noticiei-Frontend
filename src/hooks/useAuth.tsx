import {
	createContext,
	useState,
	useEffect,
	ReactNode,
	useContext
} from "react";
import { api } from "../utils/api";
import { useToast } from "@chakra-ui/react";
import { isValidToken, setSession } from "../utils/jwt";

interface AuthContextData {
  isLoading: boolean;
  isAuthenticated: boolean;
  handleLogin: (email: string, password: string) => void;
  handleLogout: () => void;
}

interface AuthProviderProps {
  children: ReactNode
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
	const [isLoading, setIsLoading] = useState(false);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const toast = useToast({
		position: "bottom-right",
		duration: 4000,
		containerStyle: {
			mb: "20px"
		},
	});

	useEffect(() => {
		const initialize = async () => {
			try {
				setIsLoading(true);

				const token = localStorage.getItem("token");

				if (token && isValidToken(token)) {
					setSession(token);

					const response = await api.get("/auth/me");

					localStorage.setItem("user_name", response.data.name);
					localStorage.setItem("user_email", response.data.email);

					setIsAuthenticated(true);
				}
			} catch (error) {
				setIsAuthenticated(false);
			}
			finally {
				setIsLoading(false);
			}
		};

		initialize();
	}, []);

	async function handleLogin(email: string, password: string) {
		setIsLoading(true);

		try {
			let response = await api.post("/auth", {
				email,
				password
			});

			const access_token: string = response.data.access_token;

			setSession(access_token);

			response = await api.get("/auth/me");

			localStorage.setItem("user_name", response.data.name);
			localStorage.setItem("user_email", response.data.email);

			setIsAuthenticated(true);
		} catch (err) {
			toast({ title: "Erro ao efetuar login!", status: "error" });
			console.log(err);
		}
		finally {
			setIsLoading(false);
		}
	}

	function handleLogout() {
		setIsAuthenticated(false);

		const settings = localStorage.getItem("settings");

		localStorage.clear();

		if (settings) {
			localStorage.setItem("settings", settings);
		}

		delete api.defaults.headers.Authorization;
	}

	return (
		<AuthContext.Provider value={{ isLoading, isAuthenticated, handleLogin, handleLogout }}>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}
