import { Model } from 'sequelize';
import { compare } from '../../utils/hash';

export default class Teacher extends Model {
  async verifyPassword(password) {
    return compare(this.passwordHash, password);
  }
}
