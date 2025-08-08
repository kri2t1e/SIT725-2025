const express = require('express');
const router = express.Router();

// Sample projects data
let projects = [
    { id: 1, name: 'Project 1', description: 'First project' },
    { id: 2, name: 'Project 2', description: 'Second project' }
];

// GET all projects
router.get('/', (req, res) => {
    res.json(projects);
});

// GET project by ID
router.get('/:id', (req, res) => {
    const project = projects.find(p => p.id == req.params.id);
    if (project) {
        res.json(project);
    } else {
        res.status(404).json({ error: 'Project not found' });
    }
});

// POST create new project
router.post('/', (req, res) => {
    const newProject = {
        id: projects.length + 1,
        name: req.body.name,
        description: req.body.description
    };
    projects.push(newProject);
    res.status(201).json(newProject);
});

module.exports = router; 