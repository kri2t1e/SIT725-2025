const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const http = require('http'); // HTTP server for Socket.IO
const { Server } = require('socket.io'); // Socket.IO server

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins for development
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(morgan('combined')); // Logging

// Serve static files from views directory
app.use('/views', express.static(path.join(__dirname, 'views')));

// Import routes
const projectsRoute = require('./routes/projects');
const helloRoute = require('./routes/hello');
const foodRoute = require('./routes/food');

// Make Socket.IO instance available to routes
app.set('socketio', io);

// Use routes
app.use('/api/projects', projectsRoute);
app.use('/api/hello', helloRoute);
app.use('/api/food', foodRoute);

// Root route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to MVC Architecture App!',
        version: '1.0.0',
        endpoints: {
            projects: '/api/projects',
            food: '/api/food',
            hello: '/api/hello'
        },
        views: {
            home: '/views/index.html',
            food: '/views/food.html',
            projects: '/views/projects.html'
        }
    });
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        error: 'Route not found'
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        error: 'Something went wrong!'
    });
});

// Socket.IO Real-time Event Handlers
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    // When a user joins, tell them about it
    socket.emit('welcome', {
        message: 'Welcome! You are now connected to real-time updates.',
        socketId: socket.id
    });

    // Tell all other users someone joined
    socket.broadcast.emit('userJoined', {
        message: 'A new user joined the application',
        userId: socket.id
    });

    // Handle user joining specific rooms for different features
    socket.on('joinRoom', (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room: ${room}`);
        socket.to(room).emit('userJoinedRoom', {
            message: `A user joined ${room} section`,
            userId: socket.id,
            room: room
        });
    });

    // Handle leaving rooms
    socket.on('leaveRoom', (room) => {
        socket.leave(room);
        console.log(`User ${socket.id} left room: ${room}`);
        socket.to(room).emit('userLeftRoom', {
            message: `A user left ${room} section`,
            userId: socket.id,
            room: room
        });
    });

    // Handle real-time chat messages (general feature)
    socket.on('sendMessage', (data) => {
        console.log('Message received:', data);
        // Send message to all users
        io.emit('newMessage', {
            message: data.message,
            userId: socket.id,
            timestamp: new Date(),
            username: data.username || 'Anonymous'
        });
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
        // Tell all users someone left
        socket.broadcast.emit('userLeft', {
            message: 'A user left the application',
            userId: socket.id
        });
    });
});

// Start the server using the HTTP server (not just Express app)
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Socket.IO enabled for real-time communication');
    console.log('MVC Architecture implemented successfully!');
    console.log('Available views:');
    console.log(`  - Home: http://localhost:${PORT}/views/index.html`);
    console.log(`  - Food Management: http://localhost:${PORT}/views/food.html`);
    console.log(`  - Project Management: http://localhost:${PORT}/views/projects.html`);
    console.log('');
    console.log('Real-time Features Available:');
    console.log('  - Live notifications when users join/leave');
    console.log('  - Real-time updates when food items are added');
    console.log('  - Live updates when projects are created');
    console.log('  - Instant messaging between users');
}); 