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
    
    // Get Socket.IO instance and emit real-time update
    const io = req.app.get('socketio');
    if (io) {
      // Broadcast to all users that a new food item was added
      io.emit('foodAdded', {
        message: `New food item "${newFood.name}" has been added!`,
        data: newFood,
        timestamp: new Date()
      });
      
      // Emit to users in the 'food' room specifically
      io.to('food').emit('newFoodItem', {
        message: `A new ${newFood.category} dish "${newFood.name}" is now available!`,
        food: newFood,
        timestamp: new Date()
      });
    }
    
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
    
    // Emit real-time update for food item changes
    const io = req.app.get('socketio');
    if (io) {
      io.emit('foodUpdated', {
        message: `Food item "${updatedFood.name}" has been updated!`,
        data: updatedFood,
        timestamp: new Date()
      });
      
      io.to('food').emit('foodItemUpdated', {
        message: `"${updatedFood.name}" details have been modified`,
        food: updatedFood,
        timestamp: new Date()
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
    
    // Emit real-time notification for food item deletion
    const io = req.app.get('socketio');
    if (io) {
      io.emit('foodDeleted', {
        message: `Food item "${deletedFood.name}" has been removed!`,
        data: deletedFood,
        timestamp: new Date()
      });
      
      io.to('food').emit('foodItemDeleted', {
        message: `"${deletedFood.name}" is no longer available`,
        food: deletedFood,
        timestamp: new Date()
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