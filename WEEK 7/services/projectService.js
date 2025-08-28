const Project = require('../models/Project');

// In-memory storage for projects (replace with database in production)
let projects = [
  new Project({
    id: 1,
    name: 'Project 1',
    description: 'First project',
    status: 'active'
  }),
  new Project({
    id: 2,
    name: 'Project 2',
    description: 'Second project',
    status: 'completed'
  })
];

// Get all projects
const getAllProjects = async () => {
  return projects.map(project => project.toJSON());
};

// Get project by ID
const getProjectById = async (id) => {
  const project = projects.find(project => project.id == id);
  return project ? project.toJSON() : null;
};

// Create new project
const createProject = async (projectData) => {
  const project = new Project(projectData);
  
  // Validate the project data
  const validationErrors = project.validate();
  if (validationErrors.length > 0) {
    throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
  }
  
  projects.push(project);
  return project.toJSON();
};

// Update project
const updateProject = async (id, updateData) => {
  const projectIndex = projects.findIndex(project => project.id == id);
  
  if (projectIndex === -1) {
    return null;
  }
  
  // Create updated project object
  const updatedProject = new Project({
    ...projects[projectIndex],
    ...updateData,
    id: id // Preserve the original ID
  });
  
  // Validate the updated data
  const validationErrors = updatedProject.validate();
  if (validationErrors.length > 0) {
    throw new Error(`Validation failed: ${validationErrors.join(', ')}`);
  }
  
  projects[projectIndex] = updatedProject;
  return updatedProject.toJSON();
};

// Delete project
const deleteProject = async (id) => {
  const projectIndex = projects.findIndex(project => project.id == id);
  
  if (projectIndex === -1) {
    return null;
  }
  
  const deletedProject = projects[projectIndex];
  projects.splice(projectIndex, 1);
  
  return deletedProject.toJSON();
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
}; 