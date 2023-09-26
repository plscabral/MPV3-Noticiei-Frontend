import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		watch: {
			usePolling: true,
		},
		host: true, // necessário para que o mapeamento da porta do Docker Container funcione
		strictPort: true,
		port: 3333, // você pode substituir esta porta por qualquer porta
	}
});
