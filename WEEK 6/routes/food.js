const express = require('express');
const router = express.Router();
const foodController = require('../controllers/foodController');

// GET all food items
router.get('/', foodController.getAllFood);

// GET food by ID
router.get('/:id', foodController.getFoodById);

// POST create new food item
router.post('/', foodController.createFood);

// PUT update food item
router.put('/:id', foodController.updateFood);

// DELETE food item
router.delete('/:id', foodController.deleteFood);

module.exports = router; 