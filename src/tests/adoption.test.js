

// test/adoption.test.js
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js';

chai.use(chaiHttp);
const { expect } = chai;

describe('Adoption Router Functional Tests', () => {
  let testUserId;
  let testPetId;
  let testAdoptionId;

  before((done) => {
    // Create a test user
    chai.request(app)
      .post('/api/sessions/register')
      .send({
        first_name: 'Adopt',
        last_name: 'Tester',
        email: `adopt${Date.now()}@mail.com`,
        age: 30,
        password: 'password123'
      })
      .end((err, res) => {
        testUserId = res.body.user._id;

        // Create a test pet
        chai.request(app)
          .post('/api/pets')
          .send({ name: 'Test Pet', species: 'Dog', age: 3 })
          .end((err, res) => {
            testPetId = res.body.pet._id;
            done();
          });
      });
  });

  it('should get all adoptions', (done) => {
    chai.request(app)
      .get('/api/adoptions')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.status).to.equal('success');
        done();
      });
  });

  it('should create a new adoption', (done) => {
    chai.request(app)
      .post(`/api/adoptions/${testUserId}/${testPetId}`)
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('status', 'success');
        expect(res.body.adoption).to.have.property('_id');
        testAdoptionId = res.body.adoption._id;
        done();
      });
  });

  it('should get a specific adoption by ID', (done) => {
    chai.request(app)
      .get(`/api/adoptions/${testAdoptionId}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.payload).to.have.property('_id', testAdoptionId);
        done();
      });
  });
});
