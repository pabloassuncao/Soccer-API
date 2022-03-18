import { Model, Optional, DataTypes } from 'sequelize';
import db from '.';
import Clubs from './Clubs';
// import OtherModel from './OtherModel';

interface MatchesAttributes {
  id: number;
  homeTeam: number;
  homeTeamGoals: number;
  awayTeam: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export type MatchesInput = Optional<MatchesAttributes, 'id'>;
export type MatchesOuput = Required<MatchesAttributes>;

class Matches extends Model<MatchesAttributes, MatchesInput> implements MatchesOuput {
  public id: number;

  public homeTeam: number;

  public homeTeamGoals: number;

  public awayTeam: number;

  public awayTeamGoals: number;

  public inProgress: boolean;
}

Matches.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  homeTeam: {
    field: 'home_team',
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'clubs',
      key: 'id',
    },
  },
  homeTeamGoals: {
    field: 'home_team_goals',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  awayTeam: {
    field: 'away_team',
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'clubs',
      key: 'id',
    },
  },
  awayTeamGoals: {
    field: 'away_team_goals',
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  inProgress: {
    field: 'in_progress',
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Matchs',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

Matches.belongsTo(Clubs, { foreignKey: 'home_team', targetKey: 'id', as: 'homeClub' });
Matches.belongsTo(Clubs, { foreignKey: 'away_team', targetKey: 'id', as: 'awayClub' });

Clubs.hasMany(Matches, { foreignKey: 'home_team', as: 'home' });
Clubs.hasMany(Matches, { foreignKey: 'away_team', as: 'away' });

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Matches;
