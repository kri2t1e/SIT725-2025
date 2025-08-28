class Food {
  constructor(data) {
    this.id = data.id || Date.now().toString();
    this.name = data.name;
    this.category = data.category;
    this.price = data.price;
    this.description = data.description;
    this.isAvailable = data.isAvailable !== undefined ? data.isAvailable : true;
    this.createdAt = data.createdAt || new Date().toISOString();
    this.updatedAt = data.updatedAt || new Date().toISOString();
  }

  validate() {
    const errors = [];
    
    if (!this.name || typeof this.name !== 'string' || this.name.trim().length === 0) {
      errors.push('Name is required and must be a string');
    }
    
    if (!this.category || typeof this.category !== 'string' || this.category.trim().length === 0) {
      errors.push('Category is required and must be a string');
    }
    
    if (this.price === undefined || this.price === null || typeof this.price !== 'number' || this.price < 0) {
      errors.push('Price must be a positive number');
    }
    
    if (!this.description || typeof this.description !== 'string' || this.description.trim().length === 0) {
      errors.push('Description is required and must be a string');
    }
    
    if (this.isAvailable !== undefined && typeof this.isAvailable !== 'boolean') {
      errors.push('isAvailable must be a boolean');
    }
    
    return errors;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      category: this.category,
      price: this.price,
      description: this.description,
      isAvailable: this.isAvailable,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Food;
