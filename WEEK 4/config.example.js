// Configuration Example
// Copy this file to config.js and update the values

module.exports = {
    // Server Configuration
    port: process.env.PORT || 3004,
    
    // Database Configuration
    mongoURI: process.env.MONGODB_URI || 'mongodb://localhost:27017/myprojectDB',
    
    // Environment
    environment: process.env.NODE_ENV || 'development',
    
    // Optional: MongoDB Atlas (Cloud) Configuration
    // mongoURI: 'mongodb+srv://username:password@cluster.mongodb.net/myprojectDB?retryWrites=true&w=majority'
};
