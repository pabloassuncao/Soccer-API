import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Users from '../database/models/Users';

import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

describe('Seu teste', () => {
  before(async () => {
    sinon
      .stub(Users, "findOne")
      .resolves({
        id: 1,
        username: "Admin",
        role: "admin",
        email: "admin@admin.com",
      } as Users);
  });

  after(()=>{
    (Users.findOne as sinon.SinonStub).restore();
  })

  it('...', async () => {
    const chaiHttpResponse = await chai
      .request(app)

    expect()
  });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
