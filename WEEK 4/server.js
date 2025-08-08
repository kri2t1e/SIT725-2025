var express = require("express")
var app = express()
var port = process.env.port || 3004
const mongoose = require('mongoose');

// Middleware
app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://localhost:27017/myprojectDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

// 2. Define your schema and model
const ProjectSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
    link: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field before saving
ProjectSchema.pre('save', function(next) {
    this.updatedAt = new Date();
    next();
});

const Project = mongoose.model('Project', ProjectSchema);

// 3. REST API routes

// GET all projects with search, filter, and pagination
app.get('/api/projects', async (req, res) => {
    try {
        const { 
            page = 1, 
            limit = 10, 
            search = '', 
            sortBy = 'createdAt', 
            sortOrder = 'desc' 
        } = req.query;

        // Build query
        let query = {};
        if (search) {
            query = {
                $or: [
                    { title: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } }
                ]
            };
        }

        // Build sort object
        const sort = {};
        sort[sortBy] = sortOrder === 'desc' ? -1 : 1;

        // Calculate pagination
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        // Execute query
        const projects = await Project.find(query)
            .sort(sort)
            .skip(skip)
            .limit(parseInt(limit));

        // Get total count for pagination
        const total = await Project.countDocuments(query);
        const totalPages = Math.ceil(total / parseInt(limit));

        res.json({ 
            statusCode: 200, 
            data: projects, 
            message: 'Success',
            pagination: {
                currentPage: parseInt(page),
                totalPages,
                totalItems: total,
                itemsPerPage: parseInt(limit)
            }
        });
    } catch (error) {
        res.status(500).json({ statusCode: 500, data: null, message: 'Error fetching projects', error: error.message });
    }
});

// GET project by ID
app.get('/api/projects/:id', async (req, res) => {
    try {
        const project = await Project.findById(req.params.id);
        if (!project) {
            return res.status(404).json({ statusCode: 404, data: null, message: 'Project not found' });
        }
        res.json({ statusCode: 200, data: project, message: 'Success' });
    } catch (error) {
        res.status(500).json({ statusCode: 500, data: null, message: 'Error fetching project', error: error.message });
    }
});

// POST create new project
app.post('/api/projects', async (req, res) => {
    try {
        const { title, image, link, description } = req.body;
        
        // Enhanced validation
        if (!title || !image || !link || !description) {
            return res.status(400).json({ 
                statusCode: 400, 
                data: null, 
                message: 'All fields (title, image, link, description) are required' 
            });
        }

        // Validate URL formats
        const urlRegex = /^https?:\/\/.+/;
        if (!urlRegex.test(image) || !urlRegex.test(link)) {
            return res.status(400).json({
                statusCode: 400,
                data: null,
                message: 'Image and link must be valid URLs starting with http:// or https://'
            });
        }

        // Check if project with same title already exists
        const existingProject = await Project.findOne({ title: title.trim() });
        if (existingProject) {
            return res.status(409).json({
                statusCode: 409,
                data: null,
                message: 'A project with this title already exists'
            });
        }

        const newProject = new Project({ title, image, link, description });
        const savedProject = await newProject.save();
        res.status(201).json({ statusCode: 201, data: savedProject, message: 'Project created successfully' });
    } catch (error) {
        res.status(500).json({ statusCode: 500, data: null, message: 'Error creating project', error: error.message });
    }
});

// PUT update project
app.put('/api/projects/:id', async (req, res) => {
    try {
        const { title, image, link, description } = req.body;
        
        // Enhanced validation
        if (!title || !image || !link || !description) {
            return res.status(400).json({ 
                statusCode: 400, 
                data: null, 
                message: 'All fields (title, image, link, description) are required' 
            });
        }

        // Validate URL formats
        const urlRegex = /^https?:\/\/.+/;
        if (!urlRegex.test(image) || !urlRegex.test(link)) {
            return res.status(400).json({
                statusCode: 400,
                data: null,
                message: 'Image and link must be valid URLs starting with http:// or https://'
            });
        }

        // Check if project with same title already exists (excluding current project)
        const existingProject = await Project.findOne({ 
            title: title.trim(), 
            _id: { $ne: req.params.id } 
        });
        if (existingProject) {
            return res.status(409).json({
                statusCode: 409,
                data: null,
                message: 'A project with this title already exists'
            });
        }

        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            { title, image, link, description, updatedAt: new Date() },
            { new: true, runValidators: true }
        );

        if (!updatedProject) {
            return res.status(404).json({ statusCode: 404, data: null, message: 'Project not found' });
        }

        res.json({ statusCode: 200, data: updatedProject, message: 'Project updated successfully' });
    } catch (error) {
        res.status(500).json({ statusCode: 500, data: null, message: 'Error updating project', error: error.message });
    }
});

// DELETE project
app.delete('/api/projects/:id', async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        
        if (!deletedProject) {
            return res.status(404).json({ statusCode: 404, data: null, message: 'Project not found' });
        }

        res.json({ statusCode: 200, data: deletedProject, message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ statusCode: 500, data: null, message: 'Error deleting project', error: error.message });
    }
});

// GET project statistics
app.get('/api/projects/stats/summary', async (req, res) => {
    try {
        const totalProjects = await Project.countDocuments();
        const recentProjects = await Project.countDocuments({
            createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) }
        });

        res.json({
            statusCode: 200,
            data: {
                totalProjects,
                recentProjects,
                averageProjectsPerWeek: Math.round(totalProjects / Math.max(1, Math.ceil((Date.now() - new Date('2024-01-01').getTime()) / (7 * 24 * 60 * 60 * 1000))))
            },
            message: 'Statistics retrieved successfully'
        });
    } catch (error) {
        res.status(500).json({ statusCode: 500, data: null, message: 'Error fetching statistics', error: error.message });
    }
});

// 4. Start server
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
    console.log(`Frontend available at: http://localhost:${port}`);
    console.log(`API available at: http://localhost:${port}/api/projects`);
});


