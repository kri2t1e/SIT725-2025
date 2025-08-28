const projectService = require('../services/projectService');

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await projectService.getAllProjects();
    res.status(200).json({
      success: true,
      data: projects,
      count: projects.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get project by ID
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await projectService.getProjectById(id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: project
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Create new project
const createProject = async (req, res) => {
  try {
    const projectData = req.body;
    const newProject = await projectService.createProject(projectData);
    
    // Get Socket.IO instance and emit real-time update
    const io = req.app.get('socketio');
    if (io) {
      // Broadcast to all users that a new project was created
      io.emit('projectAdded', {
        message: `New project "${newProject.name}" has been created!`,
        data: newProject,
        timestamp: new Date()
      });
      
      // Emit to users in the 'projects' room specifically
      io.to('projects').emit('newProject', {
        message: `Project "${newProject.name}" is now ${newProject.status}!`,
        project: newProject,
        timestamp: new Date()
      });
    }
    
    res.status(201).json({
      success: true,
      data: newProject
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Update project
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedProject = await projectService.updateProject(id, updateData);
    
    if (!updatedProject) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }
    
    // Emit real-time update for project changes
    const io = req.app.get('socketio');
    if (io) {
      io.emit('projectUpdated', {
        message: `Project "${updatedProject.name}" has been updated!`,
        data: updatedProject,
        timestamp: new Date()
      });
      
      io.to('projects').emit('projectModified', {
        message: `Project "${updatedProject.name}" status changed to ${updatedProject.status}`,
        project: updatedProject,
        timestamp: new Date()
      });
    }
    
    res.status(200).json({
      success: true,
      data: updatedProject
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
};

// Delete project
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await projectService.deleteProject(id);
    
    if (!deletedProject) {
      return res.status(404).json({
        success: false,
        error: 'Project not found'
      });
    }
    
    // Emit real-time notification for project deletion
    const io = req.app.get('socketio');
    if (io) {
      io.emit('projectDeleted', {
        message: `Project "${deletedProject.name}" has been removed!`,
        data: deletedProject,
        timestamp: new Date()
      });
      
      io.to('projects').emit('projectRemoved', {
        message: `Project "${deletedProject.name}" has been permanently deleted`,
        project: deletedProject,
        timestamp: new Date()
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Project deleted successfully',
      data: deletedProject
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
}; 