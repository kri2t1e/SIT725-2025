const request = require('supertest');
const { expect } = require('chai');
const { createTestServer } = require('./setup');

describe('Testing the projects system', () => {
  let app;

  before(() => {
    app = createTestServer();
  });

  describe('Looking at all projects', () => {
    it('shows all projects in the list', (done) => {
      request(app)
        .get('/api/projects')
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

  describe('Looking at one specific project', () => {
    it('shows details of a specific project', (done) => {
      request(app)
        .get('/api/projects/1')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.be.true;
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('id');
          expect(res.body.data.id).to.equal(1);
          expect(res.body.data).to.have.property('name');
          expect(res.body.data).to.have.property('description');
          done();
        });
    });

    it('says project not found when looking for project that does not exist', (done) => {
      request(app)
        .get('/api/projects/999')
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.be.false;
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('Project not found');
          done();
        });
    });
  });

  describe('Creating new projects', () => {
    it('adds new project when all information is correct', (done) => {
      const newProject = {
        id: 999,
        name: 'Test Project',
        description: 'Test project description',
        status: 'active'
      };

      request(app)
        .post('/api/projects')
        .send(newProject)
        .expect(201)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.be.true;
          expect(res.body).to.have.property('data');
          expect(res.body.data).to.have.property('name');
          expect(res.body.data.name).to.equal(newProject.name);
          expect(res.body.data).to.have.property('description');
          expect(res.body.data.description).to.equal(newProject.description);
          done();
        });
    });

    it('refuses to add project when important information is missing', (done) => {
      const invalidProject = {
        // Project without name or description
        status: 'active'
      };

      request(app)
        .post('/api/projects')
        .send(invalidProject)
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
  });

  describe('Changing project information', () => {
    it('updates project details when project exists', (done) => {
      const updateData = {
        name: 'Updated Project Title',
        status: 'completed'
      };

      request(app)
        .put('/api/projects/1')
        .send(updateData)
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.be.true;
          expect(res.body).to.have.property('data');
          expect(res.body.data.name).to.equal(updateData.name);
          expect(res.body.data.status).to.equal(updateData.status);
          done();
        });
    });

    it('says project not found when trying to update project that does not exist', (done) => {
      const updateData = {
        name: 'Updated Title',
        status: 'active'
      };

      request(app)
        .put('/api/projects/99999') // Try to update project that does not exist
        .send(updateData)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.be.false;
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('Project not found');
          done();
        });
    });
  });

  describe('Removing projects', () => {
    it('removes project when project exists', (done) => {
      request(app)
        .delete('/api/projects/2')
        .expect(200)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.be.true;
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Project deleted successfully');
          expect(res.body).to.have.property('data');
          done();
        });
    });

    it('says project not found when trying to remove project that does not exist', (done) => {
      request(app)
        .delete('/api/projects/99999') // Try to delete project that does not exist
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.body).to.have.property('success');
          expect(res.body.success).to.be.false;
          expect(res.body).to.have.property('error');
          expect(res.body.error).to.equal('Project not found');
          done();
        });
    });
  });
});
