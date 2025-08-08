// Services entry point
// This file can be used to export all services or add service-specific utilities

const projectService = require('./projectService');
const foodService = require('./foodService');

module.exports = {
  projectService,
  foodService
}; 