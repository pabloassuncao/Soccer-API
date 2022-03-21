import { Err } from '../utils';
import ClubRepository from '../Repositories/ClubRepository';

export default class ClubsService {
  static async getAll() {
    return ClubRepository.getAll({ raw: true });
  }

  static async getAllClubsWithMatches() {
    return ClubRepository.getAllClubsWithMatches();
  }

  static async getById(id: number) {
    const res = await ClubRepository.getById(id);

    if (!res) {
      throw new Err('UNAUTHORIZED', 'There is no team with such id!');
    }

    return res;
  }
}
