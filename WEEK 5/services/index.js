// Services entry point
// This file can be used to export all services or add service-specific utilities

const foodService = require('./foodService');
const projectService = require('./projectService');

module.exports = {
  foodService,
  projectService
}; 