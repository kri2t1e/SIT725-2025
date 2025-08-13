class Project {
  constructor(data) {
    this.id = data.id || Date.now();
    this.name = data.name;
    this.description = data.description;
    this.status = data.status || 'active';
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  validate() {
    const errors = [];
    
    if (!this.name || this.name.trim().length === 0) {
      errors.push('Project name is required');
    }
    
    if (!this.description || this.description.trim().length === 0) {
      errors.push('Project description is required');
    }
    
    if (this.status && !['active', 'completed', 'on-hold'].includes(this.status)) {
      errors.push('Status must be one of: active, completed, on-hold');
    }
    
    return errors;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Project;
