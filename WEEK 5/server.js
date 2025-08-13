const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');
const app = express();
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

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('MVC Architecture implemented successfully!');
    console.log('Available views:');
    console.log(`  - Home: http://localhost:${PORT}/views/index.html`);
    console.log(`  - Food Management: http://localhost:${PORT}/views/food.html`);
    console.log(`  - Project Management: http://localhost:${PORT}/views/projects.html`);
}); 