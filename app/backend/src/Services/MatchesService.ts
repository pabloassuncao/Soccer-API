import { Err } from '../utils';
import MatchRepository from '../Repositories/MatchRepository';
import ClubsService from './ClubsService';

export interface INewMatchDTO {
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export default class MatchesService {
  private static async clubsChecker(awayTeam: number, homeTeam: number) {
    if (awayTeam === homeTeam) {
      throw new Err('UNPROCCESSABLE_ENTITY', 'Teams cannot be the same');
    }

    await ClubsService.getById(homeTeam);
    await ClubsService.getById(awayTeam);
  }

  static async getAll({ inProgress } = { inProgress: false }) {
    return MatchRepository
      .getAll(inProgress);
  }

  static async getById(id: number) {
    const res = MatchRepository
      .getById(id);

    if (!res) {
      throw new Err('UNPROCCESSABLE_ENTITY', 'Match not found');
    }

    return res;
  }

  static async create(data: INewMatchDTO) {
    this.clubsChecker(data.awayTeam, data.homeTeam);

    return MatchRepository.create(data);
  }
}
