const foodService = require('../services/foodService');

// Get all food items
const getAllFood = async (req, res) => {
  try {
    const foodItems = await foodService.getAllFood();
    res.status(200).json({
      success: true,
      data: foodItems,
      count: foodItems.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get food by ID
const getFoodById = async (req, res) => {
  try {
    const { id } = req.params;
    const food = await foodService.getFoodById(id);
    
    if (!food) {
      return res.status(404).json({
        success: false,
        error: 'Food item not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: food
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Create new food item
const createFood = async (req, res) => {
  try {
    const foodData = req.body;
    const newFood = await foodService.createFood(foodData);
    
    res.status(201).json({
      success: true,
      data: newFood
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update food item
const updateFood = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedFood = await foodService.updateFood(id, updateData);
    
    if (!updatedFood) {
      return res.status(404).json({
        success: false,
        error: 'Food item not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: updatedFood
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete food item
const deleteFood = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFood = await foodService.deleteFood(id);
    
    if (!deletedFood) {
      return res.status(404).json({
        success: false,
        error: 'Food item not found'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Food item deleted successfully',
      data: deletedFood
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getAllFood,
  getFoodById,
  createFood,
  updateFood,
  deleteFood
}; 