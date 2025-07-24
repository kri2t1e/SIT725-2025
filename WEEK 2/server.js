// Simple HTTP Methods Demo Server
const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json());

// ===== HTTP METHODS =====

// GET - Read data
app.get('/hello', (req, res) => {
    res.send('Hello! This is a GET request - reading data');
});

// GET with parameters - Basic Calculator Functions
app.get('/add', (req, res) => {
    const num1 = parseInt(req.query.num1) || 0;
    const num2 = parseInt(req.query.num2) || 0;
    const result = num1 + num2;
    res.send(`${num1} + ${num2} = ${result}`);
});

app.get('/subtract', (req, res) => {
    const num1 = parseInt(req.query.num1) || 0;
    const num2 = parseInt(req.query.num2) || 0;
    const result = num1 - num2;
    res.send(`${num1} - ${num2} = ${result}`);
});

app.get('/multiply', (req, res) => {
    const num1 = parseInt(req.query.num1) || 0;
    const num2 = parseInt(req.query.num2) || 0;
    const result = num1 * num2;
    res.send(`${num1} × ${num2} = ${result}`);
});

app.get('/divide', (req, res) => {
    const num1 = parseInt(req.query.num1) || 0;
    const num2 = parseInt(req.query.num2) || 1;
    if (num2 === 0) {
        return res.send('Error: Cannot divide by zero');
    }
    const result = num1 / num2;
    res.send(`${num1} ÷ ${num2} = ${result}`);
});

app.get('/power', (req, res) => {
    const num1 = parseInt(req.query.num1) || 0;
    const num2 = parseInt(req.query.num2) || 0;
    const result = Math.pow(num1, num2);
    res.send(`${num1} ^ ${num2} = ${result}`);
});

// POST - Create data (Calculator with POST)
app.post('/calculate', (req, res) => {
    const { num1, num2, operation } = req.body;
    
    if (!num1 || !num2 || !operation) {
        return res.send('Error: Please provide num1, num2, and operation');
    }
    
    let result;
    switch(operation) {
        case 'add':
            result = parseInt(num1) + parseInt(num2);
            break;
        case 'subtract':
            result = parseInt(num1) - parseInt(num2);
            break;
        case 'multiply':
            result = parseInt(num1) * parseInt(num2);
            break;
        case 'divide':
            if (parseInt(num2) === 0) {
                return res.send('Error: Cannot divide by zero');
            }
            result = parseInt(num1) / parseInt(num2);
            break;
        case 'power':
            result = Math.pow(parseInt(num1), parseInt(num2));
            break;
        default:
            return res.send('Error: Invalid operation. Use: add, subtract, multiply, divide, power');
    }
    
    res.send(`Result: ${num1} ${operation} ${num2} = ${result}`);
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
    console.log('  GET  /subtract?num1=5&num2=3 - Subtract numbers');
    console.log('  GET  /multiply?num1=5&num2=3 - Multiply numbers');
    console.log('  GET  /divide?num1=6&num2=2 - Divide numbers');
    console.log('  GET  /power?num1=2&num2=3 - Power calculation');
    console.log('  POST /calculate - Calculator with POST');
    console.log('  POST /create-user - Create user');
    console.log('  PUT  /update-user - Update user');
    console.log('  DELETE /delete-user - Delete user');
});
