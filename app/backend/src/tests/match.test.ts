import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Matches';
import Clubs from '../database/models/Clubs';

import { ADMIN_USER, ClubsFindAllResponse, FinishMatchResponse,
  HTTP_CREATED_STATUS, HTTP_OK_STATUS, HTTP_UNAUTHORIZED_STATUS,
  HTTP_UNPROCCESSABLE_ENTITY_STATUS,
  MatchesCreateResponse, MatchesFindAllResponse, MatchesFindAllTrueResponse, NewMatchFindByIdResponse, UpdatedMatchResponse } from './helpers';
import Users from '../database/models/Users';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa os endpoints get do /matchs', () => {
  before(async () => {
    sinon
      .stub(Matches, "findAll")
      .onFirstCall().resolves(MatchesFindAllResponse as unknown as Matches[])
      .onSecondCall().resolves(MatchesFindAllTrueResponse as unknown as Matches[])
    
    sinon
      .stub(Matches, "findByPk")
      .resolves(MatchesFindAllResponse[0] as unknown as Matches);
  });

  after(()=>{
    (Matches.findAll as sinon.SinonStub).restore();
    (Matches.findByPk as sinon.SinonStub).restore();
  });

  it('Testa se recebe a lista com todas as partidas', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .get('/matchs');

    expect(chaiHttpResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.be.an('object');
    expect(chaiHttpResponse.body[0]).to.be.deep.equal({
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: false,
      awayClub: {
        id: 8,
        clubName: 'Grêmio'
      },
      homeClub: {
        id: 16,
        clubName: 'São Paulo'
      }
    });
  });

  it('Testa se recebe a partida pelo Id', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .get('/matchs/1');

    expect(chaiHttpResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.be.deep.equal({
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: false,
      awayClub: {
        id: 8,
        clubName: 'Grêmio'
      },
      homeClub: {
        id: 16,
        clubName: 'São Paulo'
      }
    });
  });

  it('Testa se recebe a lista com as partidas em progresso', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .get('/matchs?inProgress=true');

    expect(chaiHttpResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.be.an('object');
    expect(chaiHttpResponse.body[0]).to.be.deep.equal({
      id: 1,
      homeTeam: 16,
      homeTeamGoals: 1,
      awayTeam: 8,
      awayTeamGoals: 1,
      inProgress: true,
      awayClub: {
        id: 8,
        clubName: 'Grêmio'
      },
      homeClub: {
        id: 16,
        clubName: 'São Paulo'
      }
    });
  });
});

describe('Testa os endpoints post do /matchs', () => {
  before(async () => {
    sinon
    .stub(Users, "findOne")
    .resolves(ADMIN_USER as Users);

    sinon
    .stub(Clubs, "findOne")
    .onCall(0).resolves({ id: 12, clubName: 'Palmeiras'} as Clubs)
    .onCall(1).resolves({ id: 4, clubName: 'Corinthians'} as Clubs)
    .onCall(2).resolves(null as unknown as Clubs);

    sinon
      .stub(Matches, "create")
      .resolves(MatchesCreateResponse as unknown as Matches)
    
    sinon
      .stub(Matches, "findByPk")
      .resolves(NewMatchFindByIdResponse as unknown as Matches);
  });

  after(()=>{
    (Matches.create as sinon.SinonStub).restore();
    (Matches.findByPk as sinon.SinonStub).restore();
    (Users.findOne as sinon.SinonStub).restore();
  });

  it('Testa se recebe a partida para criar', async () => {
    const login = await chai
    .request(app)
    .post('/login')
    .send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    });

    const chaiHttpResponse = await chai
    .request(app)
    .post('/matchs')
    .set('Authorization', login.body.token)
    .send({
      homeTeam: 12,
      homeTeamGoals: 5,
      awayTeam: 4,
      awayTeamGoals: 1,
      inProgress: true,
    });

    expect(chaiHttpResponse.status).to.be.equal(HTTP_CREATED_STATUS);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.be.deep.equal({
      id: 14,
      homeTeam: 12,
      homeTeamGoals: 5,
      awayTeam: 4,
      awayTeamGoals: 1,
      inProgress: true,
    });

    const findChaiHttpResponse = await chai
      .request(app)
      .get('/matchs/14');
    
    expect(findChaiHttpResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(findChaiHttpResponse.body).to.be.an('object');
    expect(findChaiHttpResponse.body).to.be.deep.equal(NewMatchFindByIdResponse);

  });

  it('Testa se não cria a partida com dois clubes iguais', async () => {
    const login = await chai
    .request(app)
    .post('/login')
    .send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    });

    const chaiHttpResponse = await chai
    .request(app)
    .post('/matchs')
    .set('Authorization', login.body.token)
    .send({
      homeTeam: 12,
      homeTeamGoals: 1,
      awayTeam: 12,
      awayTeamGoals: 1,
      inProgress: true,
    });

    expect(chaiHttpResponse.status).to.be.equal(HTTP_UNAUTHORIZED_STATUS);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.be.haveOwnProperty('message');
    expect(chaiHttpResponse.body.message).to.be.equal("It is not possible to create a match with two equal teams");

  });

  it('Testa se não cria a partida com clube inexistente', async () => {
    const login = await chai
    .request(app)
    .post('/login')
    .send({
      email: 'admin@admin.com',
      password: 'secret_admin',
    });

    const chaiHttpResponse = await chai
    .request(app)
    .post('/matchs')
    .set('Authorization', login.body.token)
    .send({
      homeTeam: 12231312,
      homeTeamGoals: 1,
      awayTeam: 12,
      awayTeamGoals: 1,
      inProgress: true,
    });

    expect(chaiHttpResponse.status).to.be.equal(HTTP_UNPROCCESSABLE_ENTITY_STATUS);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.be.haveOwnProperty('message');
    expect(chaiHttpResponse.body.message).to.be.equal("There is no team with such id!");

  });
});

describe('Testa os endpoints PATCH do /matchs', () => {
  before(async () => {
    sinon
      .stub(Matches, "findByPk")
      .resolves(new FinishMatchResponse() as unknown as Matches);
  });

  after(()=>{
    (Matches.findByPk as sinon.SinonStub).restore();
  });

  it('Testa se recebe o id no /matchs/:id/finish para terminar a partida', async () => {
    const login = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

    const chaiHttpResponse = await chai
      .request(app)
      .patch('/matchs/14/finish')
      .set('Authorization', login.body.token);

    console.log(chaiHttpResponse.body);

    expect(chaiHttpResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body).to.be.haveOwnProperty('inProgress');
    expect(chaiHttpResponse.body.inProgress).to.be.equal(false);
    expect(chaiHttpResponse.body).to.be.deep.equal({
      id: 14,
      homeTeam: 12,
      homeTeamGoals: 5,
      awayTeam: 4,
      awayTeamGoals: 1,
      inProgress: false,
      awayClub: {
        id: 4,
        clubName: 'Corinthians',
      },
      homeClub: {
        id: 12,
        clubName: 'Palmeiras',
      }
    });
  });
});

describe('Testa os endpoints PATCH do /matchs/:id', () => {
  before(async () => {
    sinon
      .stub(Matches, "findByPk")
      .onCall(0).resolves(new UpdatedMatchResponse(10, 0, true) as unknown as Matches)
      .onCall(1).resolves(new UpdatedMatchResponse(5, 1, false) as unknown as Matches);

    sinon
      .stub(Matches, "update")
      .onCall(0).resolves([1, [new Matches()]] )
      .onCall(1).resolves([0, [new Matches()]] );
  });

  after(()=>{
    (Matches.findByPk as sinon.SinonStub).restore(); 
    (Matches.update as sinon.SinonStub).restore(); 
  });

  it('Testa se recebe o id no /matchs/:id para atualizar a partida', async () => {
    const login = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

    const chaiHttpResponse = await chai
      .request(app)
      .patch('/matchs/14')
      .set('Authorization', login.body.token)
      .send({
        homeTeamGoals: 10,
        awayTeamGoals: 0,
      });

    expect(chaiHttpResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body.homeTeamGoals).to.be.equal(10);
    expect(chaiHttpResponse.body.awayTeamGoals).to.be.equal(0);
    expect(chaiHttpResponse.body.inProgress).to.be.true;
  });

  it('Testa se recebe o id no /matchs/:id sem body para finalizar a partida', async () => {
    const login = await chai
      .request(app)
      .post('/login')
      .send({
        email: 'admin@admin.com',
        password: 'secret_admin',
      });

    const chaiHttpResponse = await chai
      .request(app)
      .patch('/matchs/14')
      .set('Authorization', login.body.token)
      .send();

    expect(chaiHttpResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(chaiHttpResponse.body).to.be.an('object');
    expect(chaiHttpResponse.body.homeTeamGoals).to.be.undefined
    expect(chaiHttpResponse.body.awayTeamGoals).to.be.undefined
    expect(chaiHttpResponse.body.inProgress).to.be.false;
  });
})
