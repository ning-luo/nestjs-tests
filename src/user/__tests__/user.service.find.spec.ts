// import { Test, TestingModule } from '@nestjs/testing';
// import { mockUserRepository } from './helpers/user.mock';
import { UserService } from '../user.service';
import { setupUserServiceTestModule } from './user.service.setup';
import { mockUsers } from './helpers/user.fixture';

describe('UserService - Find Methods', () => {
  let userService: UserService;

  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     providers: [
  //       UserService,
  //       {
  //         provide: 'UserRepository',
  //         useValue: mockUserRepository,
  //       },
  //     ],
  //   }).compile();

  //   userService = module.get<UserService>(UserService);
  // });

  beforeEach(async () => {
    const module = await setupUserServiceTestModule();
    userService = module.userService;
    userService['users'] = [...mockUsers];
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  it('should find all users', () => {
    const result = userService.findAll();
    expect(result).toEqual(mockUsers);
  });

  it('should find one user', () => {
    const result = userService.findOne(1);
    expect(result).toEqual(mockUsers[0]);
  });

  // More find-related tests...
});
