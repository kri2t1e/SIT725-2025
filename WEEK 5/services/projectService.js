// In-memory storage for projects (replace with database in production)
let projects = [
  {
    id: '1',
    name: 'Sample Project 1',
    description: 'This is a sample project',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Sample Project 2',
    description: 'Another sample project',
    status: 'completed',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Get all projects
const getAllProjects = async () => {
  return projects;
};

// Get project by ID
const getProjectById = async (id) => {
  return projects.find(project => project.id === id);
};

// Create new project
const createProject = async (projectData) => {
  const newProject = {
    id: Date.now().toString(),
    ...projectData,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  
  projects.push(newProject);
  return newProject;
};

// Update project
const updateProject = async (id, updateData) => {
  const projectIndex = projects.findIndex(project => project.id === id);
  
  if (projectIndex === -1) {
    return null;
  }
  
  projects[projectIndex] = {
    ...projects[projectIndex],
    ...updateData,
    updatedAt: new Date().toISOString()
  };
  
  return projects[projectIndex];
};

// Delete project
const deleteProject = async (id) => {
  const projectIndex = projects.findIndex(project => project.id === id);
  
  if (projectIndex === -1) {
    return null;
  }
  
  const deletedProject = projects[projectIndex];
  projects.splice(projectIndex, 1);
  
  return deletedProject;
};

module.exports = {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject
}; 