import { Request, Response } from 'express';
import LeaderboardService from '../Services/LeaderboardService';

export default class LeaderboardController {
  static async getLeaderboard(req: Request, res: Response) {
    const path = req.path.split('/');
    const where = path[1] === 'home' && path[1] ? 'homeTeam' : 'awayTeam';
    const result = await LeaderboardService.getLeaderboard([where]);
    return res.status(200).json(result).end();
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await LeaderboardService.getById(+id);
    return res.status(200).json(result).end();
  }
}
