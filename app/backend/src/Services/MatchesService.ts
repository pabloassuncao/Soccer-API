import MatchRepository from '../Repositories/MatchRepository';

export default class MatchesService {
  static async getAll({ inProgress } = { inProgress: false }) {
    return MatchRepository
      .getAll(inProgress);
  }

  static async getById(id: number) {
    return MatchRepository
      .getById(id);
  }
}
