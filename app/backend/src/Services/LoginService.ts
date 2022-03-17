import { sign } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserRepository from '../Repositories/UserRepository';
import { Err, JWT_SECRET, MESSAGES } from '../utils';
import Users from '../database/models/Users';

export default class LoginService {
  private static async Checker(user: Users | null, password: string) {
    if (!user) {
      throw new Err('BAD_REQUEST', MESSAGES.EMAIL_PASSWORD_INVALID);
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new Err('BAD_REQUEST', MESSAGES.EMAIL_PASSWORD_INVALID);
    }
  }

  static async Login(data: { email: string, password: string }) {
    const user = await UserRepository.findByEmail(data.email);

    await this.Checker(user, data.password);

    const result = await UserRepository.findByEmail(data.email, ['password']);

    const token = sign(
      { result },
      JWT_SECRET,
      { algorithm: 'HS256' },
    );

    return {
      user: result,
      token,
    };
  }

  static async Validate(user: Users) {
    return user.role;
  }
}
