import Clubs from '../database/models/Clubs';

export default class ClubRepository {
  static async getAll(options: object = {}): Promise<Clubs[]> {
    const clubs: Clubs[] = await Clubs.findAll(options);
    return clubs;
  }

  static async getById(id: number, options: object = {}): Promise<Clubs | null> {
    const club: Clubs | null = await Clubs.findOne({
      where: { id },
      ...options,
    });
    return club;
  }

  static async findOne(where: object, exclude?: string[]): Promise<Clubs | null> {
    const options = exclude ? { where, attributes: { exclude } }
      : { where };

    const clubs: Clubs | null = await Clubs.findOne(options);

    return clubs;
  }
}
