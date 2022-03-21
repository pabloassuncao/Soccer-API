import { Op } from 'sequelize';
import { Err } from '../utils';
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

  static async getById(id: number) {
    const matches: Matches | null = await Matches.findByPk(id, {
      attributes: { exclude: ['home_team', 'away_team'] },
      include: [
        { model: Clubs,
          as: 'awayClub' },
        { model: Clubs,
          as: 'homeClub' },
      ],
    });

    if (!matches) {
      throw new Err('UNAUTHORIZED', 'Match not found');
    }

    return matches;
  }

  static async create(data: MatchesInput): Promise<Matches> {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = data;

    const res = await Matches.create({
      homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress,
    });
    return res;
  }

  static async update(data: MatchesInput): Promise<void> {
    const { id, homeTeamGoals, awayTeamGoals, inProgress } = data;

    await Matches.update({
      homeTeamGoals, awayTeamGoals, inProgress,
    }, {
      where: {
        id,
      },
    });
  }
}
