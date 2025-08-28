const express = require('express');
const router = express.Router();

// GET hello message
router.get('/', (req, res) => {
    res.json({ message: 'Hello, World!' });
});

// GET hello with name parameter
router.get('/:name', (req, res) => {
    const { name } = req.params;
    res.json({ message: `Hello, ${name}!` });
});

module.exports = router; 