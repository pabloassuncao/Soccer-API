import { Err } from '../utils';
import MatchRepository from '../Repositories/MatchRepository';
import ClubsService from './ClubsService';

export interface IMatchDTO {
  id?: number;
  homeTeam: number;
  awayTeam: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
}

export interface IUpdateMatchDTO {
  id: number;
  homeTeamGoals: number;
  awayTeamGoals: number;
}

export default class MatchesService {
  private static async clubsChecker(awayTeam: number, homeTeam: number) {
    if (awayTeam === homeTeam) {
      throw new Err(
        'UNAUTHORIZED',
        'It is not possible to create a match with two equal teams',
      );
    }

    await ClubsService.getById(homeTeam);
    await ClubsService.getById(awayTeam);
  }

  static async getAll({ inProgress } = { inProgress: false }) {
    return MatchRepository
      .getAll(inProgress);
  }

  static async getById(id: number) {
    const res = await MatchRepository
      .getById(id);

    return res;
  }

  static async create(data: IMatchDTO) {
    await this.clubsChecker(data.awayTeam, data.homeTeam);

    const newMatch = await MatchRepository.create(data);

    return newMatch;
  }

  static async finishHim(id: number) {
    const match = await this.getById(id);

    if (!match) {
      throw new Err('UNAUTHORIZED', 'Match not found');
    }

    if (match.inProgress) {
      match.inProgress = false;
      await MatchRepository.update(match);
    }

    return match.toJSON();
  }

  static async update({ id, awayTeamGoals, homeTeamGoals }: IUpdateMatchDTO) {
    const match = await this.getById(id);

    if (!homeTeamGoals && !awayTeamGoals) {
      match.inProgress = false;
      MatchRepository.update(match);
    }

    match.homeTeamGoals = homeTeamGoals;
    match.awayTeamGoals = awayTeamGoals;

    await MatchRepository.update(match);

    return match;
  }
}
