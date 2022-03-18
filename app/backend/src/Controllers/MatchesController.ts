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
    const {
      homeTeam, awayTeam, awayGoals, homeGoals, inProgress, awayTeamGoals, homeTeamGoals,
    } = req.body;

    const newMatch = {
      homeTeam: +homeTeam,
      awayTeam: +awayTeam,
      homeTeamGoals: +homeGoals || +homeTeamGoals || 0,
      awayTeamGoals: +awayGoals || +awayTeamGoals || 0,
      inProgress: inProgress ?? 'true',
    };

    const result = await MatchesService.create(newMatch);
    return res.status(201).json(result).end();
  }

  static async finishHim(req: Request, res: Response) {
    const { id } = req.params;

    const result = await MatchesService.finishHim(+id);
    return res.status(200).send(result).end();
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params;
    const {
      homeTeamGoals, awayTeamGoals,
    } = req.body;

    const result = await MatchesService.update({
      id: +id,
      homeTeamGoals,
      awayTeamGoals,
    });

    return res.status(200).json(result).end();
  }
}
