import { Request, Response } from 'express';
import MatchesService from '../Services/MatchesService';

export default class MatchesController {
  static async getAll(req: Request, res: Response) {
    const inProgress = req.query.inProgress === 'true';
    const result = await MatchesService.getAll({ inProgress });
    return res.status(200).json(result).end();
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await MatchesService.getById(+id);
    return res.status(200).json(result).end();
  }

  static async create(req: Request, res: Response) {
    const { homeTeam, awayTeam, awayTeamGoals, homeTeamGoals, inProgress } = req.body;

    const result = await MatchesService.create({
      homeTeam: +homeTeam,
      awayTeam: +awayTeam,
      awayTeamGoals: +awayTeamGoals,
      homeTeamGoals: +homeTeamGoals,
      inProgress,
    });
    return res.status(201).json(result).end();
  }
}
