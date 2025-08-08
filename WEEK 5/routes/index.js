const express = require('express');
const router = express.Router();

// Import route modules
const projectRoutes = require('./projects');
const foodRoutes = require('./food');
const helloRoutes = require('./hello');

// Mount routes
router.use('/projects', projectRoutes);
router.use('/food', foodRoutes);
router.use('/hello', helloRoutes);

// API info endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the API',
    version: '1.0.0',
    endpoints: {
      projects: '/api/projects',
      food: '/api/food',
      hello: '/api/hello'
    }
  });
});

module.exports = router; 