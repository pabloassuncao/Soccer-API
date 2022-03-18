import Joi from 'joi';

const matchSchema = Joi.object().keys({
  homeTeam: Joi.number().integer().required(),
  awayTeam: Joi.number().integer().required(),
  homeTeamGoals: Joi.number().integer().required(),
  awayTeamGoals: Joi.number().integer().required(),
  inProgress: Joi.boolean().required(),
});

export default matchSchema;
