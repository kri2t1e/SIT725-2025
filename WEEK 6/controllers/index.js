// Controllers entry point
// This file can be used to export all controllers or add controller-specific utilities

const projectController = require('./projectController');
const foodController = require('./foodController');
const userController = require('./userController');

module.exports = {
  projectController,
  foodController,
  userController
}; 