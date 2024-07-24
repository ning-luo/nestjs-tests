import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { mockUserRepository } from './helpers/user.mock';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

export const setupUserServiceTestModule = async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      UserService,
      {
        // provide: 'UserRepository',
        provide: getRepositoryToken(User),
        useValue: mockUserRepository,
      },
    ],
  }).compile();

  const userService = module.get<UserService>(UserService);

  return { userService };
};
