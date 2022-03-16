import { Model, Optional, DataTypes } from 'sequelize';
import db from '.';
import Clubs from './Clubs';
// import OtherModel from './OtherModel';

interface MatchsAttributes {
  id: number;
  'home_team': number;
  'home_team_goals': number;
  'away_team': number;
  'away_team_goals': number;
  'in_progress': boolean;
}

type MatchsInput = Optional<MatchsAttributes, 'id'>;
type MatchsOuput = Required<MatchsAttributes>;

class Matchs extends Model<MatchsAttributes, MatchsInput> implements MatchsOuput {
  public id: number;

  public 'home_team': number;

  public 'home_team_goals': number;

  public 'away_team': number;

  public 'away_team_goals': number;

  public 'in_progress': boolean;
}

Matchs.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  home_team: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'clubs',
      key: 'id',
    },
  },
  home_team_goals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  away_team: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'clubs',
      key: 'id',
    },
  },
  away_team_goals: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  in_progress: {
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

Matchs.belongsTo(Clubs, { foreignKey: 'home_team', targetKey: 'id', as: 'homeClub' });
Matchs.belongsTo(Clubs, { foreignKey: 'away_team', targetKey: 'id', as: 'awayClub' });

Clubs.hasMany(Matchs, { foreignKey: 'home_team', as: 'home' });
Clubs.hasMany(Matchs, { foreignKey: 'away_team', as: 'away' });

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Matchs;
