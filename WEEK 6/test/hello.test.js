const request = require('supertest');
const { expect } = require('chai');
const { createTestServer } = require('./setup');

describe('Testing the greeting system', () => {
  let app;

  before(() => {
    app = createTestServer();
  });

  describe('Basic greeting', () => {
    it('says hello to everyone', (done) => {
      request(app)
        .get('/api/hello')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Hello, World!');
          done();
        });
    });
  });

  describe('Personal greeting', () => {
    it('says hello using the persons name', (done) => {
      const testName = 'Alice';
      request(app)
        .get(`/api/hello/${testName}`)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal(`Hello, ${testName}!`);
          done();
        });
    });

    it('works with names that have special characters', (done) => {
      const testName = 'John-Doe_123';
      request(app)
        .get(`/api/hello/${testName}`)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal(`Hello, ${testName}!`);
          done();
        });
    });

    it('says general hello when no name is given', (done) => {
      request(app)
        .get('/api/hello/')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Hello, World!');
          done();
        });
    });

    it('works with names that have spaces in them', (done) => {
      const testName = 'John%20Doe'; // Name with space
      request(app)
        .get(`/api/hello/${testName}`)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Hello, John Doe!'); // Shows name correctly
          done();
        });
    });
  });
});
