import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';

import { ADMIN_USER, FindAllClubsWithMatchesAwayResponse, FindAllClubsWithMatchesHomeResponse, FindAllClubsWithMatchesResponse, HTTP_BAD_REQUEST_STATUS, HTTP_OK_STATUS, HTTP_UNAUTHORIZED_STATUS, HTTP_UNPROCCESSABLE_ENTITY_STATUS, LOGIN_ROUTE, LOGIN_VALIDATE_ROUTE } from './helpers';
import Clubs from '../database/models/Clubs';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa o Leaderboard', () => {
  before(async () => {
    sinon
      .stub(Clubs, "findAll")
      .onCall(0).resolves(FindAllClubsWithMatchesHomeResponse as unknown as Clubs[])
      .onCall(1).resolves(FindAllClubsWithMatchesAwayResponse as unknown as Clubs[])
      .onCall(2).resolves(FindAllClubsWithMatchesResponse as unknown as Clubs[]);
  });

  after(()=>{
    (Clubs.findAll as sinon.SinonStub).restore();
  })

  it('Testa se o endpoint "/leaderboard/home" retorna somente com as partidas em casa', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/home');

    expect(chaiHttpResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[2]).to.be.deep.equal(	{
      name: 'Palmeiras',
      totalPoints: 7,
      totalGames: 3,
      totalVictories: 2,
      totalDraws: 1,
      totalLosses: 0,
      goalsFavor: 10,
      goalsOwn: 5,
      goalsBalance: 5,
      efficiency: 77.78
    });
  })

  it('Testa se o endpoint "/leaderboard/away" retorna somente com as partidas em casa', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard/away');

    expect(chaiHttpResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.be.deep.equal(	{
      name: 'Palmeiras',
      totalPoints: 6,
      totalGames: 2,
      totalVictories: 2,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 7,
      goalsOwn: 0,
      goalsBalance: 7,
      efficiency: 100
    })
  })

  it('Testa se o endpoint "/leaderboard" retorna somente com as partidas em casa', async () => {
    const chaiHttpResponse = await chai
      .request(app)
      .get('/leaderboard');

    expect(chaiHttpResponse.status).to.be.equal(HTTP_OK_STATUS);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body[0]).to.be.deep.equal(			{
      name: 'Palmeiras',
      totalPoints: 13,
      totalGames: 5,
      totalVictories: 4,
      totalDraws: 1,
      totalLosses: 0,
      goalsFavor: 17,
      goalsOwn: 5,
      goalsBalance: 12,
      efficiency: 86.67
    });
  })
});
