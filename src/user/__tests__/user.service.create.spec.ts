// import { Test, TestingModule } from '@nestjs/testing';
// import { mockUserRepository } from './helpers/user.mock';
import { UserService } from '../user.service';
import { setupUserServiceTestModule } from './user.service.setup';
import { mockUsers, createMockUser } from './helpers/user.fixture';

describe('UserService - Create Methods', () => {
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

  // it('should create a new user', async () => {
  //   const user = { name: 'New User' };
  //   const result = await userService.create(user);
  //   expect(result).toEqual(user);
  // });

  // More create-related tests...

  it('should create a new user', () => {
    const user = createMockUser(3, 'New User');
    const result = userService.create(user);
    expect(result).toEqual(user);
    expect(userService.findAll()).toContainEqual(user);
  });

  it('should update a user', () => {
    const updatedUser = { id: 1, name: 'Updated User' };
    const result = userService.update(1, updatedUser);
    expect(result).toEqual(updatedUser);
    expect(userService.findOne(1)).toEqual(updatedUser);
  });

  it('should remove a user', () => {
    const result = userService.remove(1);
    expect(result).toEqual([mockUsers[0]]);
    expect(userService.findAll()).not.toContainEqual(mockUsers[0]);
  });
});
