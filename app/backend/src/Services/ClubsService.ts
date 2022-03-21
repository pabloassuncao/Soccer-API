import { Err } from '../utils';
import ClubRepository from '../Repositories/ClubRepository';

export default class ClubsService {
  static async getAll() {
    return ClubRepository.getAll({ raw: true });
  }

  static async getById(id: number) {
    const res = await ClubRepository.getById(id);

    console.log(res);

    if (!res) {
      throw new Err('UNPROCCESSABLE_ENTITY', 'There is no team with such id!');
    }

    return res;
  }
}
