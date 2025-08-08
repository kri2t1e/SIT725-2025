// In-memory storage for food items (replace with database in production)
let foodItems = [
  {
    id: '1',
    name: 'Pizza',
    category: 'Italian',
    price: 15.99,
    description: 'Delicious Italian pizza',
    isAvailable: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Burger',
    category: 'Fast Food',
    price: 12.99,
    description: 'Classic beef burger',
    isAvailable: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Get all food items
const getAllFood = async () => {
  return foodItems;
};

// Get food by ID
const getFoodById = async (id) => {
  return foodItems.find(food => food.id === id);
};

// Create new food item
const createFood = async (foodData) => {
  const newFood = {
    id: Date.now().toString(),
    ...foodData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  foodItems.push(newFood);
  return newFood;
};

// Update food item
const updateFood = async (id, updateData) => {
  const foodIndex = foodItems.findIndex(food => food.id === id);
  
  if (foodIndex === -1) {
    return null;
  }
  
  foodItems[foodIndex] = {
    ...foodItems[foodIndex],
    ...updateData,
    updatedAt: new Date().toISOString()
  };
  
  return foodItems[foodIndex];
};

// Delete food item
const deleteFood = async (id) => {
  const foodIndex = foodItems.findIndex(food => food.id === id);
  
  if (foodIndex === -1) {
    return null;
  }
  
  const deletedFood = foodItems[foodIndex];
  foodItems.splice(foodIndex, 1);
  
  return deletedFood;
};

module.exports = {
  getAllFood,
  getFoodById,
  createFood,
  updateFood,
  deleteFood
}; 