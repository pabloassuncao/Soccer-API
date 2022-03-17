import { Request, Response } from 'express';
import ClubsService from '../Services/ClubsService';

export default class ClubsController {
  static async getAll(req: Request, res: Response) {
    const result = await ClubsService.getAll();
    return res.status(200).json(result).end();
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params;
    const result = await ClubsService.getById(+id);
    return res.status(200).json(result).end();
  }
}
