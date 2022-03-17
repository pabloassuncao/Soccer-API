import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';

import { ADMIN_USER, HTTP_BAD_REQUEST_STATUS, HTTP_OK_STATUS, HTTP_UNAUTHORIZED_STATUS, HTTP_UNPROCCESSABLE_ENTITY_STATUS, LOGIN_ROUTE } from './helpers';
import UserRepository from '../Repositories/UserRepository';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o login', () => {
  describe('Testa o login com dados válidos', async () => {
    before(async () => {
      sinon
        .stub(UserRepository, "findByEmail")
        .resolves(ADMIN_USER as Users);
    });

    after(()=>{
      (UserRepository.findByEmail as sinon.SinonStub).restore();
    })
  
    const chaiHttpResponse = await chai
      .request(app)
      .post('/login')
      .set('Content-Type', 'application/json')
      .set('Accept', 'application/json')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

    expect(chaiHttpResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.have.property('token');
    expect(chaiHttpResponse.body).to.have.property('user');
    expect(chaiHttpResponse.body.user).to.be.an('object');
    expect(chaiHttpResponse.body.user).to.have.property('id');
    expect(chaiHttpResponse.body.user).to.have.property('username');
    expect(chaiHttpResponse.body.user).to.have.property('role');
    expect(chaiHttpResponse.body.user).to.have.property('email');
    expect(chaiHttpResponse.body.password).to.be.undefined;
  });

  describe('Testa o login com dados ausentes', async () => {
    it('Testa dar erro ao tentar logar sem senha', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({
          email: 'admin@admin.com',
        });

      expect(chaiHttpResponse.status).to.be.equal(HTTP_UNAUTHORIZED_STATUS);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
      expect(chaiHttpResponse.body.password).to.be.undefined;
    });
    it('Testa dar erro ao tentar logar sem email', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({
          password: 'secret_admin',
        });

      expect(chaiHttpResponse.status).to.be.equal(HTTP_UNAUTHORIZED_STATUS);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('All fields must be filled');
      expect(chaiHttpResponse.body.email).to.be.undefined;
    });
  });

  describe('Testa o login com dados inválidos', async () => {
    it('Testa dar erro ao tentar logar com senha inválida', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({
          email: 'admin@admin.com',
          password: 'invalid_password',
        });

      expect(chaiHttpResponse.status).to.be.equal(HTTP_BAD_REQUEST_STATUS);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
      expect(chaiHttpResponse.body.password).to.be.undefined;
    });

    it('Testa dar erro ao tentar logar com email inválido', async () => {
      const chaiHttpResponse = await chai
        .request(app)
        .post('/login')
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .send({
          email: 'test@test.com',
          password: 'secret_admin',
        });

      expect(chaiHttpResponse.status).to.be.equal(HTTP_BAD_REQUEST_STATUS);
      expect(chaiHttpResponse.body).to.be.an('object');
      expect(chaiHttpResponse.body).to.have.property('message');
      expect(chaiHttpResponse.body.message).to.be.equal('Incorrect email or password');
      expect(chaiHttpResponse.body.email).to.be.undefined;
    });
  });
});
