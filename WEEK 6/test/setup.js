const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

// Create test server instance
const createTestServer = () => {
  const app = express();

  // Middleware
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Serve static files from views directory
  app.use('/views', express.static(path.join(__dirname, '../views')));

  // Import routes
  const projectsRoute = require('../routes/projects');
  const helloRoute = require('../routes/hello');
  const foodRoute = require('../routes/food');

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

  return app;
};

module.exports = { createTestServer };
