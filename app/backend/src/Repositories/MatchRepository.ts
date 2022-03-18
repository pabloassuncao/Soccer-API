import { Op } from 'sequelize';
import Clubs from '../database/models/Clubs';
import Matches, { MatchesInput } from '../database/models/Matches';

export default class MatchRepository {
  static model = Matches;

  static async getAll(inProgress: boolean): Promise<Matches[]> {
    const matches: Matches[] = await Matches.findAll({
      where: {
        inProgress: {
          [Op.or]: [true, inProgress],
        },
      },
      attributes: { exclude: ['home_team', 'away_team'] },
      include: [
        { model: Clubs,
          as: 'awayClub' },
        { model: Clubs,
          as: 'homeClub' },
      ] });
    return matches;
  }

  static async getById(id: number): Promise<Matches | null> {
    const matches: Matches | null = await Matches.findByPk(id, {
      attributes: { exclude: ['home_team', 'away_team'] },
      include: [
        { model: Clubs,
          as: 'awayClub' },
        { model: Clubs,
          as: 'homeClub' },
      ],
    });
    return matches;
  }

  static async create(data: MatchesInput): Promise<Matches> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = data;

    const res = await Matches.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
    });
    return res;
  }

  // static async findOne(where: object, exclude?: string[]): Promise<Matches | null> {
  //   const options = exclude ? { where, attributes: { exclude } }
  //     : { where };

  //   const matches: Matches | null = await Matches.findOne(options);

  //   return matches;
  // }
}
