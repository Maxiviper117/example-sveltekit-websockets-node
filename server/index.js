// filepath: server/index.js
import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { handler } from '../build/handler.js';
// Assume you have a function to verify your tokens
// import { verifyToken } from './authUtils.js';

const port = 3000;
const app = express();
const server = createServer(app);
const io = new Server(server);

// Middleware to parse JSON bodies
app.use(express.json());

// Socket.IO Authentication Middleware
io.use((socket, next) => {
    const token = socket.handshake.auth.token;

    // Replace with your actual token verification logic
    // const user = verifyToken(token);
    const isValidToken = (t) => t === 'your_jwt_token_here'; // Placeholder validation

    if (isValidToken(token)) {
        // socket.data.user = user; // Optionally attach user info to the socket
        next(); // Allow connection
    } else {
        console.log('WebSocket authentication failed');
        next(new Error('Authentication error')); // Deny connection
    }
});


// WebSocket connection handler (only runs for authenticated connections)
io.on('connection', (socket) => {
    console.log('Authenticated client connected:', socket.id);
    socket.emit('eventFromServer', 'Hello, Authenticated User 👋');

    // Optional: Handle client messages
    socket.on('eventFromClient', (data) => {
        console.log('Received from client:', data);
    });

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

// Express endpoint to trigger WebSocket messages
app.post('/api/trigger-ws', (req, res) => {
    // ... (rest of the endpoint code remains the same) ...
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ error: 'Message is required' });
    }

    console.log('Triggering WebSocket message:', message);
    io.emit('eventFromServer', message);
    res.status(200).json({ status: 'Message sent to all clients', message });
});

// SvelteKit handles all other routes
app.use(handler);

server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});