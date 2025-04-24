/**
 * @module
 * @description This module sets up a WebSocket server using Socket.IO in a Vite development server.
 * 
 * @example
 * ```ts
 * import webSocketServer from './server/wsPluginVite';
 * import tailwindcss from '@tailwindcss/vite';
 * import { sveltekit } from '@sveltejs/kit/vite';
 * import { defineConfig } from 'vite';
 * 
 * export default defineConfig({
 * 	plugins: [tailwindcss(), sveltekit(),
 * });
 * 
 * 
 * 
 */

import { Server } from 'socket.io';
import { type ViteDevServer } from 'vite';

const webSocketServer = {
	name: 'webSocketServer',
	configureServer(server: ViteDevServer) {
		if (!server.httpServer) return;

		const io = new Server(server.httpServer);

		io.on('connection', (socket) => {
			socket.emit('eventFromServer', 'Hello, World 👋');
		});
	}
};

export default webSocketServer;
