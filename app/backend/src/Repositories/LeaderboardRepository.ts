import Matches from '../database/models/Matches';
import Clubs from '../database/models/Clubs';
import { IClub, IMatches, Leaderboard } from '../utils';

export default class LeaderboardRepository {
  private static newClubInfo() {
    return {
      name: '',
      totalPoints: 0,
      totalGames: 0,
      totalVictories: 0,
      totalDraws: 0,
      totalLosses: 0,
      goalsFavor: 0,
      goalsOwn: 0,
      goalsBalance: 0,
      efficiency: 0,
    } as Leaderboard;
  }

  private static calc(matches:IMatches[], club:IClub, reduceBase: Leaderboard) {
    const res = matches.reduce((acc, match) => {
      acc.totalGames += 1;
      if (match.homeTeamGoals === match.awayTeamGoals) {
        acc.totalDraws += 1;
      } else if (match.homeTeamGoals > match.awayTeamGoals === (match.homeTeam === club.id)) {
        acc.totalVictories += 1;
      } else {
        acc.totalLosses += 1;
      }
      acc.goalsFavor += match.homeTeam === club.id ? match.homeTeamGoals : match.awayTeamGoals;
      acc.goalsOwn += match.homeTeam !== club.id ? match.homeTeamGoals : match.awayTeamGoals;
      return acc;
    }, reduceBase);
    return res;
  }

  static getLeaderboard(clubs: IClub[], wher:['homeTeam' | 'awayTeam'] | ['awayTeam', 'homeTeam']) {
    const res: Leaderboard[] = clubs.map((club: IClub): Leaderboard => {
      const reduceBase: Leaderboard = this.newClubInfo();
      const matches: IMatches[] = wher.flatMap((homeOrAway) => club[homeOrAway]
        .filter((match: IMatches) => !match.inProgress));
      const resultCalc: Leaderboard = this.calc(matches, club, reduceBase);
      resultCalc.name = club.clubName;
      resultCalc.totalPoints = resultCalc.totalVictories * 3 + resultCalc.totalDraws;
      resultCalc.efficiency = Math
        .round((resultCalc.totalPoints / (resultCalc.totalGames * 3)) * 10000) / 100;
      resultCalc.goalsBalance = resultCalc.goalsFavor - resultCalc.goalsOwn;
      return resultCalc;
    });

    return res;
  }

  static async getAllClubs(): Promise<Clubs[]> {
    const clubs: Clubs[] = await Clubs.findAll({
      include: [
        { model: Matches, as: 'awayTeam', attributes: { exclude: ['home_team', 'away_team'] } },
        { model: Matches, as: 'homeTeam', attributes: { exclude: ['home_team', 'away_team'] } },
      ],
    });
    return clubs;
  }

  static async getById(id: number, options: object = {}): Promise<Clubs | null> {
    const club: Clubs | null = await Clubs.findOne({
      where: { id },
      ...options,
    });
    return club;
  }

  // static async findOne(where: object, exclude?: string[]): Promise<Clubs | null> {
  //   const options = exclude ? { where, attributes: { exclude } }
  //     : { where };

  //   const clubs: Clubs | null = await Clubs.findOne(options);

  //   return clubs;
  // }
}
