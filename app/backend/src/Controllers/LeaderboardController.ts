import { Request, Response } from 'express';
import LeaderboardService from '../Services/LeaderboardService';

export default class LeaderboardController {
  static async getLeaderboard(req: Request, res: Response) {
    const { path } = req;
    if (path === '/') {
      const result = await LeaderboardService.getLeaderboard(['awayTeam', 'homeTeam']);
      return res.status(200).json(result).end();
    }
    const where = path === '/home' ? 'homeTeam' : 'awayTeam';
    const result = await LeaderboardService.getLeaderboard([where]);
    return res.status(200).json(result).end();
  }
}
