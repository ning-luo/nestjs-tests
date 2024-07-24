import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async update(id: number, user: User): Promise<User> {
    await this.userRepository.update(id, user);
    return this.userRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    await this.userRepository.delete(id);
    return user;
  }
}
