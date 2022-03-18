import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Matches from '../database/models/Matches';

import { HTTP_OK_STATUS, MatchesFindAllResponse, MatchesFindAllTrueResponse } from './helpers';
import MatchRepository from '../Repositories/MatchRepository';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testa os endpoints do /matchs', () => {
  before(async () => {
    sinon
      .stub(MatchRepository, "getAll")
      .onFirstCall().resolves(MatchesFindAllResponse as unknown as Matches[])
      .onSecondCall().resolves(MatchesFindAllTrueResponse as unknown as Matches[])
    
    sinon
      .stub(MatchRepository, "getById")
      .resolves(MatchesFindAllResponse[0] as unknown as Matches);
  });

  after(()=>{
    (MatchRepository.getAll as sinon.SinonStub).restore();
    (MatchRepository.getById as sinon.SinonStub).restore();
  })

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
