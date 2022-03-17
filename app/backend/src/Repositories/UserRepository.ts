import Users from '../database/models/Users';

export default class UserRepository {
  static async findByEmail(email: string, exclude?: string[]): Promise<Users | null> {
    const options = exclude ? { where: { email }, attributes: { exclude } }
      : { where: { email } };

    const user: Users | null = await Users.findOne(options);

    return user;
  }
}
