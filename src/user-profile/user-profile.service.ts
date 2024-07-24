import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserProfile } from './entities/user-profile.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserProfileService {
  constructor(
    @InjectRepository(UserProfile)
    private readonly userProfileRepository: Repository<UserProfile>,
  ) {}

  async create(profile: UserProfile): Promise<UserProfile> {
    return this.userProfileRepository.save(profile);
  }

  async findAll(): Promise<UserProfile[]> {
    return this.userProfileRepository.find();
  }

  async findOne(id: number): Promise<UserProfile> {
    return this.userProfileRepository.findOne({ where: { id } });
  }

  async update(id: number, profile: UserProfile): Promise<UserProfile> {
    await this.userProfileRepository.update(id, profile);
    return this.userProfileRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<UserProfile> {
    const profile = await this.userProfileRepository.findOne({ where: { id } });
    await this.userProfileRepository.delete(id);
    return profile;
  }
}
