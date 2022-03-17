import { sign } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserRepository from '../Repositories/UserRepository';
import { Err, JWT_SECRET, MESSAGES } from '../utils';

export default class LoginService {
  static async Login(data: { email: string, password: string }) {
    const user = await UserRepository.findByEmail(data.email);

    if (!user) {
      throw new Err('BAD_REQUEST', MESSAGES.EMAIL_PASSWORD_INVALID);
    }

    if (!bcrypt.compareSync(data.password, user.password)) {
      throw new Err('BAD_REQUEST', MESSAGES.EMAIL_PASSWORD_INVALID);
    }

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
}
