import { Err } from '../utils';
import ClubRepository from '../Repositories/ClubRepository';

export default class ClubsService {
  static async getAll() {
    return ClubRepository.getAll({ raw: true });
  }

  static async getById(id: number) {
    const res = ClubRepository.getById(id, { raw: true });

    if (!res) {
      throw new Err('UNPROCCESSABLE_ENTITY', 'Club not found');
    }

    return res;
  }
}
