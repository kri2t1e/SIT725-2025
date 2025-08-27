const request = require('supertest');
const { expect } = require('chai');
const { createTestServer } = require('./setup');

describe('Testing the main API', () => {
  let app;

  before(() => {
    app = createTestServer();
  });

  describe('Home page', () => {
    it('shows welcome message when visiting home page', (done) => {
      request(app)
        .get('/')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Welcome to MVC Architecture App!');
          expect(res.body).to.have.property('version');
          expect(res.body).to.have.property('endpoints');
          expect(res.body.endpoints).to.have.property('projects');
          expect(res.body.endpoints).to.have.property('food');
          expect(res.body.endpoints).to.have.property('hello');
          done();
        });
    });
  });

  describe('When page does not exist', () => {
    it('shows error message for pages that do not exist', (done) => {
      request(app)
        .get('/api/nonexistent')
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
});
