/* eslint-disable max-lines-per-function */
import { Leaderboard } from '../utils';
import LeaderboardRepository from '../Repositories/LeaderboardRepository';
import ClubsService from './ClubsService';

export default class LeaderboardService {
  private static sortLeaderboard(a: Leaderboard, b: Leaderboard) {
    if (a.totalPoints !== b.totalPoints) return b.totalPoints - a.totalPoints;
    if (a.goalsBalance !== b.goalsBalance) return b.goalsBalance - a.goalsBalance;
    if (a.goalsFavor !== b.goalsFavor) return b.goalsFavor - a.goalsFavor;
    if (a.totalVictories !== b.totalVictories) return b.totalVictories - a.totalVictories;
    return 0;
  }

  static async getLeaderboard(where: ['homeTeam' | 'awayTeam'] | ['awayTeam', 'homeTeam']) {
    const clubs = await ClubsService.getAllClubsWithMatches();

    const result = LeaderboardRepository.getLeaderboard(clubs, where)
      .sort(this.sortLeaderboard);

    return result;
  }
}
