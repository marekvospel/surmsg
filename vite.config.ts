import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";

export default defineConfig({
	server: {
		proxy: {
			'/rpc': {
				target: 'ws://localhost:8000/',
				changeOrigin: true,
				ws: true,
			}
		}
	},
	plugins: [
		sveltekit(),
		UnoCSS(),
	]
});
