import { Test, TestingModule } from '@nestjs/testing';
import { UserProfileService } from '../user-profile.service';
import { mockUserProfileRepository } from './helpers/user-profile.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserProfile } from '../entities/user-profile.entity';

export const setupUserProfileServiceTestModule = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      UserProfileService,
      {
        provide: getRepositoryToken(UserProfile),
        useValue: mockUserProfileRepository,
      },
    ],
  }).compile();

  const userProfileService = module.get<UserProfileService>(UserProfileService);

  return { userProfileService };
};
