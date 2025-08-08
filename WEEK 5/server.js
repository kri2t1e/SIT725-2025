const express = require('express');
const app = express();
const PORT = 3000;

// Import routes
const projectsRoute = require('./routes/projects');
const helloRoute = require('./routes/hello');

// Use routes
app.use('/api/projects', projectsRoute);
app.use('/api/hello', helloRoute);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to MVC App!');
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}); 