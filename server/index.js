import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { handler } from '../build/handler.js';

const port = 3000;
const app = express();
const server = createServer(app);
const io = new Server(server);

// Middleware to parse JSON bodies for the Express endpoint
app.use(express.json());

// WebSocket connection handler
// io.on('connection', (socket) => {
//     socket.emit('eventFromServer', 'Hello, World 👋');

//     // Optional: Handle client messages
//     socket.on('eventFromClient', (data) => {
//         console.log('Received from client:', data);
//     });
// });

// Express endpoint to trigger WebSocket messages
app.post('/api/trigger-ws', (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Triggering WebSocket message:', message);

    // Broadcast the message to all connected WebSocket clients
    io.emit('eventFromServer', message);
    res.status(200).json({ status: 'Message sent to all clients', message });
});

// SvelteKit handles all other routes
app.use(handler);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});