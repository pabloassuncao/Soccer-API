import ClubRepository from '../Repositories/ClubRepository';

export default class ClubService {
  static async getAll() {
    return ClubRepository.getAll({ raw: true });
  }

  static async getById(id: number) {
    return ClubRepository.getById(id, { raw: true });
  }
}
