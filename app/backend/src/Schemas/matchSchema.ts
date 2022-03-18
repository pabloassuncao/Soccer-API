import Joi from 'joi';

const definitiveSchema = Joi.alternatives()
  .conditional(Joi.object({ homeGoals: Joi.exist(), awayGoals: Joi.exist() }).unknown(), {
    then: Joi.object().keys({
      homeTeam: Joi.number().integer().required(),
      awayTeam: Joi.number().integer().required(),
      homeGoals: Joi.number().integer().required(),
      awayGoals: Joi.number().integer().required(),
      inProgress: Joi.boolean(),
    }),
    otherwise: Joi.object().keys({
      homeTeam: Joi.number().integer().required(),
      awayTeam: Joi.number().integer().required(),
      homeTeamGoals: Joi.number().integer().required(),
      awayTeamGoals: Joi.number().integer().required(),
      inProgress: Joi.boolean(),
    }),
  });

export default {
  definitiveSchema,
};
