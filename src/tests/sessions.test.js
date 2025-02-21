// test/sessions.test.js
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app.js'; // Adjust the path if needed

chai.use(chaiHttp);
const { expect } = chai;

describe('Sessions API', () => {
  let testEmail = `test${Date.now()}@mail.com`;
  let testPassword = 'password123';

  it('should register a new user', (done) => {
    chai.request(app)
      .post('/api/sessions/register')
      .send({
        first_name: 'Test',
        last_name: 'User',
        email: testEmail,
        age: 25,
        password: testPassword
      })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('message').that.includes('User registered');
        done();
      });
  });

  it('should log in a user', (done) => {
    chai.request(app)
      .post('/api/sessions/login')
      .send({ email: testEmail, password: testPassword })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });
});