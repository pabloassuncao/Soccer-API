import { sign } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UserRepository from '../Repositories/UserRepository';
import { Err, JWT_SECRET } from '../utils';

export default class LoginService {
  static async Login(data: { email: string, password: string }) {
    const user = await UserRepository.findByEmail(data.email);

    if (!bcrypt.compareSync(data.password, user.password)) {
      throw new Err('BAD_REQUEST', 'Invalid password');
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
