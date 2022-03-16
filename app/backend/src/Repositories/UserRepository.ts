import { Err } from '../utils';
import Users from '../database/models/Users';

export default class UserRepository {
  static async findByEmail(email: string, exclude?: string[]): Promise<Users> {
    const options = exclude ? { where: { email }, attributes: { exclude } }
      : { where: { email } };

    const user: Users | null = await Users.findOne(options);

    if (!user) {
      throw new Err('BAD_REQUEST', 'User not found');
    }

    return user;
  }
}
