// Simple HTTP Methods Demo Server
const express = require('express');
const app = express();

// Serve static files from 'public' folder
app.use(express.static('public'));

// Parse JSON data
app.use(express.json());

// ===== HTTP METHODS =====

// GET - Read data
app.get('/hello', (req, res) => {
    res.send('Hello! This is a GET request - reading data');
});

// GET with parameters
app.get('/add', (req, res) => {
    const num1 = parseInt(req.query.num1) || 0;
    const num2 = parseInt(req.query.num2) || 0;
    const result = num1 + num2;
    res.send(`${num1} + ${num2} = ${result}`);
});

// POST - Create data
app.post('/create-user', (req, res) => {
    const { name, age } = req.body;
    
    if (!name || !age) {
        return res.send('Error: Please provide both name and age');
    }
    
    res.send(`Created user: ${name}, age ${age}`);
});

// PUT - Update data
app.put('/update-user', (req, res) => {
    const { name, newAge } = req.body;
    
    if (!name || !newAge) {
        return res.send('Error: Please provide both name and new age');
    }
    
    res.send(`Updated user ${name} to age ${newAge}`);
});

// DELETE - Remove data
app.delete('/delete-user', (req, res) => {
    const { name } = req.body;
    
    if (!name) {
        return res.send('Error: Please provide a name to delete');
    }
    
    res.send(`Deleted user: ${name}`);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log('Available endpoints:');
    console.log('  GET  /hello - Say hello');
    console.log('  GET  /add?num1=5&num2=3 - Add numbers');
    console.log('  POST /create-user - Create user');
    console.log('  PUT  /update-user - Update user');
    console.log('  DELETE /delete-user - Delete user');
});
