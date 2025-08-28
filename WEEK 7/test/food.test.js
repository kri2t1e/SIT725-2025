const request = require('supertest');
const { expect } = require('chai');
const { createTestServer } = require('./setup');

describe('Testing the food menu system', () => {
  let app;

  before(() => {
    app = createTestServer();
  });

  describe('Looking at all food items', () => {
    it('shows all food items on the menu', (done) => {
      request(app)
        .get('/api/food')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.be.true;
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.be.an('array');
          expect(res.body).to.have.property('count');
          expect(res.body.count).to.equal(res.body.data.length);
          done();
        });
    });
  });

  describe('Looking at one specific food item', () => {
    it('shows details of a specific food item', (done) => {
      request(app)
        .get('/api/food/1')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.be.true;
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data.id).to.equal('1');
          expect(res.body.data).to.have.property('name');
          expect(res.body.data).to.have.property('category');
          expect(res.body.data).to.have.property('price');
          done();
        });
    });

    it('says food not found when looking for food that does not exist', (done) => {
      request(app)
        .get('/api/food/999')
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.be.false;
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('Food item not found');
          done();
        });
    });
  });

  describe('Adding new food to the menu', () => {
    it('adds new food item when all information is correct', (done) => {
      const newFood = {
        id: '999',
        name: 'Test Food',
        category: 'Test Category',
        price: 9.99,
        description: 'Test description',
        isAvailable: true
      };

      request(app)
        .post('/api/food')
        .send(newFood)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.be.true;
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('name');
          expect(res.body.data.name).to.equal(newFood.name);
          expect(res.body.data).to.have.property('price');
          expect(res.body.data.price).to.equal(newFood.price);
          done();
        });
    });

    it('refuses to add food when important information is missing', (done) => {
      const invalidFood = {
        // Food without name or price
        category: 'Test Category'
      };

      request(app)
        .post('/api/food')
        .send(invalidFood)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.be.false;
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.include('Validation failed');
          done();
        });
    });

    it('refuses to add food with negative price', (done) => {
      const invalidFood = {
        id: '998',
        name: 'Invalid Food',
        category: 'Test',
        price: -5.99, // Negative price is not allowed
        description: 'Test description',
        isAvailable: true
      };

      request(app)
        .post('/api/food')
        .send(invalidFood)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.be.false;
          expect(res.body).to.have.property('error');
          done();
        });
    });
  });

  describe('Changing food information', () => {
    it('updates food details when food exists', (done) => {
      const updateData = {
        name: 'Updated Pizza',
        price: 18.99
      };

      request(app)
        .put('/api/food/1')
        .send(updateData)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.be.true;
          expect(res.body).to.have.property('data');
          expect(res.body.data.name).to.equal(updateData.name);
          expect(res.body.data.price).to.equal(updateData.price);
          done();
        });
    });

    it('says food not found when trying to update food that does not exist', (done) => {
      const updateData = {
        name: 'Updated Food',
        price: 15.99
      };

      request(app)
        .put('/api/food/9999') // Try to update food that does not exist
        .send(updateData)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.be.false;
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('Food item not found');
          done();
        });
    });
  });

  describe('Removing food from menu', () => {
    it('removes food from menu when food exists', (done) => {
      request(app)
        .delete('/api/food/2')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.be.true;
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Food item deleted successfully');
          expect(res.body).to.have.property('data');
          done();
        });
    });

    it('says food not found when trying to remove food that does not exist', (done) => {
      request(app)
        .delete('/api/food/9999') // Try to delete food that does not exist
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.be.false;
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('Food item not found');
          done();
        });
    });
  });
});
