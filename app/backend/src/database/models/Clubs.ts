import { Model, Optional, DataTypes } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

interface ClubsAttributes {
  id: number;
  clubName: string;
}

type ClubsInput = Optional<ClubsAttributes, 'id'>;
type ClubsOuput = Required<ClubsAttributes>;

class Clubs extends Model<ClubsAttributes, ClubsInput> implements ClubsOuput {
  public id!: number;

  public clubName: string;
}

Clubs.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  clubName: {
    field: 'club_name',
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  modelName: 'Clubs',
  timestamps: false,
});

/**
  * `Workaround` para aplicar as associations em TS:
  * Associations 1:N devem ficar em uma das instâncias de modelo
  * */

// OtherModel.belongsTo(Example, { foreignKey: 'campoA', as: 'campoEstrangeiroA' });
// OtherModel.belongsTo(Example, { foreignKey: 'campoB', as: 'campoEstrangeiroB' });

// Example.hasMany(OtherModel, { foreignKey: 'campoC', as: 'campoEstrangeiroC' });
// Example.hasMany(OtherModel, { foreignKey: 'campoD', as: 'campoEstrangeiroD' });

export default Clubs;
