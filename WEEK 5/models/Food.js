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
    
    if (!this.name || this.name.trim().length === 0) {
      errors.push('Name is required');
    }
    
    if (!this.category || this.category.trim().length === 0) {
      errors.push('Category is required');
    }
    
    if (this.price === undefined || this.price === null || this.price < 0) {
      errors.push('Price must be a positive number');
    }
    
    if (!this.description || this.description.trim().length === 0) {
      errors.push('Description is required');
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
