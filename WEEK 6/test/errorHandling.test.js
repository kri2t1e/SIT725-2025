const request = require('supertest');
const { expect } = require('chai');
const { createTestServer } = require('./setup');

describe('Testing when things go wrong', () => {
  let app;

  before(() => {
    app = createTestServer();
  });

  describe('When sending bad data', () => {
    it('handles when data is sent in wrong format', (done) => {
      request(app)
        .post('/api/food')
        .send('invalid json string')
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          // App should not crash with bad data
          done();
        });
    });

    it('handles when no data is sent at all', (done) => {
      request(app)
        .post('/api/food')
        .send({})
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

  describe('When using wrong request type', () => {
    it('says not found when using request type that is not supported', (done) => {
      request(app)
        .patch('/api/food/1') // Using PATCH which is not allowed
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.be.false;
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('Route not found');
          done();
        });
    });
  });

  describe('When using strange characters', () => {
    it('handles when special characters are used in the web address', (done) => {
      request(app)
        .get('/api/food/test%20id') // Web address with space
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

    it('handles when someone uses very long ID numbers', (done) => {
      const longId = 'a'.repeat(1000); // Really long ID
      request(app)
        .get(`/api/food/${longId}`)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.be.false;
          done();
        });
    });
  });

  describe('When wrong type of information is given', () => {
    it('refuses to add food when price is not a number', (done) => {
      const invalidFood = {
        id: '997',
        name: 'Test Food',
        category: 'Test',
        price: 'invalid_price', // Text instead of number
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

    it('refuses to add food when availability is not true or false', (done) => {
      const invalidFood = {
        id: '996',
        name: 'Test Food',
        category: 'Test',
        price: 10.99,
        description: 'Test description',
        isAvailable: 'yes' // Text instead of true or false
      };

      request(app)
        .post('/api/food')
        .send(invalidFood)
        .expect(400)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.be.false;
          done();
        });
    });
  });

  describe('When sending very long text', () => {
    it('handles when description is extremely long', (done) => {
      const largeDescription = 'A'.repeat(10000); // Really long description
      const foodWithLargeDescription = {
        id: '995',
        name: 'Test Food',
        category: 'Test',
        price: 10.99,
        description: largeDescription,
        isAvailable: true
      };

      request(app)
        .post('/api/food')
        .send(foodWithLargeDescription)
        .end((err, res) => {
          if (err) return done(err);
          // App should handle long text without crashing
          expect(res.status).to.be.oneOf([200, 201, 400, 413]);
          done();
        });
    });
  });

  describe('When using edge case numbers', () => {
    it('accepts when price is zero', (done) => {
      const foodWithZeroPrice = {
        id: '994',
        name: 'Free Food',
        category: 'Test',
        price: 0, // Free item
        description: 'Free sample',
        isAvailable: true
      };

      request(app)
        .post('/api/food')
        .send(foodWithZeroPrice)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.be.true;
          expect(res.body.data.price).to.equal(0);
          done();
        });
    });

    it('handles when price is extremely large number', (done) => {
      const foodWithMaxPrice = {
        id: '993',
        name: 'Expensive Food',
        category: 'Luxury',
        price: Number.MAX_SAFE_INTEGER,
        description: 'Very expensive item',
        isAvailable: true
      };

      request(app)
        .post('/api/food')
        .send(foodWithMaxPrice)
        .end((err, res) => {
          if (err) return done(err);
          // App should handle huge numbers properly
          expect(res.status).to.be.oneOf([201, 400]);
          done();
        });
    });
  });

  describe('When many people use the app at once', () => {
    it('works when multiple people access the app at the same time', (done) => {
      const requests = [];
      
      // Five people using app at same time
      for (let i = 0; i < 5; i++) {
        requests.push(
          request(app)
            .get('/api/food')
            .expect(200)
        );
      }

      Promise.all(requests)
        .then(responses => {
          responses.forEach(res => {
            expect(res.body).to.have.property('success');
            expect(res.body.success).to.be.true;
          });
          done();
        })
        .catch(done);
    });
  });
});
