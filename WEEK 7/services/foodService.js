const Food = require('../models/Food');

// In-memory storage for food items (replace with database in production)
let foodItems = [
  new Food({
    id: '1',
    name: 'Pizza',
    category: 'Italian',
    price: 15.99,
    description: 'Delicious Italian pizza',
    isAvailable: true
  }),
  new Food({
    id: '2',
    name: 'Burger',
    category: 'Fast Food',
    price: 12.99,
    description: 'Classic beef burger',
    isAvailable: true
  })
];

// Get all food items
const getAllFood = async () => {
  return foodItems.map(food => food.toJSON());
};

// Get food by ID
const getFoodById = async (id) => {
  const food = foodItems.find(food => food.id === id);
  return food ? food.toJSON() : null;
};

// Create new food item
const createFood = async (foodData) => {
  const food = new Food(foodData);
  
  // Validate the food data
  const validationErrors = food.validate();
  if (validationErrors.length > 0) {
    throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
  }
  
  foodItems.push(food);
  return food.toJSON();
};

// Update food item
const updateFood = async (id, updateData) => {
  const foodIndex = foodItems.findIndex(food => food.id === id);
  
  if (foodIndex === -1) {
    return null;
  }
  
  // Create updated food object
  const updatedFood = new Food({
    ...foodItems[foodIndex],
    ...updateData,
    id: id // Preserve the original ID
  });
  
  // Validate the updated data
  const validationErrors = updatedFood.validate();
  if (validationErrors.length > 0) {
    throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
  }
  
  foodItems[foodIndex] = updatedFood;
  return updatedFood.toJSON();
};

// Delete food item
const deleteFood = async (id) => {
  const foodIndex = foodItems.findIndex(food => food.id === id);
  
  if (foodIndex === -1) {
    return null;
  }
  
  const deletedFood = foodItems[foodIndex];
  foodItems.splice(foodIndex, 1);
  
  return deletedFood.toJSON();
};

module.exports = {
  getAllFood,
  getFoodById,
  createFood,
  updateFood,
  deleteFood
}; 