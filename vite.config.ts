import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
// import webSocketServer from './server/wsPluginVite';

export default defineConfig({
	plugins: [
		tailwindcss(), 
		sveltekit(), 
		// webSocketServer
	]
});
