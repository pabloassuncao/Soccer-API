import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Clubs from '../database/models/Clubs';

import { ClubsFindAllResponse, HTTP_OK_STATUS } from './helpers';
import ClubRepository from '../Repositories/ClubRepository';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testa os endpoints do /clubs', () => {
  before(async () => {
    sinon
      .stub(ClubRepository, "getAll")
      .resolves(ClubsFindAllResponse as Clubs[]);
  });

  after(()=>{
    (ClubRepository.getAll as sinon.SinonStub).restore();
  })

  it('Testa se recebe a lista com todos os times', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .get('/clubs');

    expect(chaiHttpResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.be.an('object');
    expect(chaiHttpResponse.body[0]).to.be.deep.equal({
      id: 1,
      clubName: 'Avaí/Kindermann',
    });
  });

  it('Testa se recebe o clube pelo Id', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .get('/clubs/1');

    expect(chaiHttpResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.be.have.property('clubName');
    expect(chaiHttpResponse.body.clubName).to.be.equal('Avaí/Kindermann');
  });
});
