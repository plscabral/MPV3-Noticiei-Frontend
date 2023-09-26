import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.tsx";

// @helmet
import { HelmetProvider } from "react-helmet-async";

// @chakra
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./utils/theme";

// auth
import { AuthProvider } from "./hooks/useAuth";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<AuthProvider>
			<HelmetProvider>
				<ChakraProvider theme={theme}>
					<App />
				</ChakraProvider>
			</HelmetProvider>
		</AuthProvider>
	</React.StrictMode>,
);
