import { Injectable } from '@nestjs/common';
import { ConfigService } from './../config';
import { User } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AppService {
  constructor(
    private config: ConfigService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
  }

  root(): string {
    return this.config.get('APP_URL');
  }

  async setPseudo(pseudo) {
    const id = this.makeid(128);
    const user = new User();
    user.token = id;
    user.bestRound = 0;
    user.pseudo = pseudo;
    await user.save();
    return user;
  }

  async update(token, round) {
    const user = await this.userRepository.findOne({ where: { token } });
    if (user.bestRound < round) {
      user.bestRound = round;
      await user.save();
    }
    return user;
  }

  async getAll() {
    return User.createQueryBuilder('user').select().orderBy('bestRound', 'DESC').getMany();

  }

  private makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
