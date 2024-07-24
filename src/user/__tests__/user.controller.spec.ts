import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { mockUsers, createMockUser } from './helpers/user.fixture';
import { mockUserService } from './helpers/user.mock';

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
    userService['users'] = [...mockUsers];
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
  });

  it('should create a user', async () => {
    const user = createMockUser(3, 'New User');
    jest.spyOn(userService, 'create').mockImplementation(() => user);
    expect(await userController.create(user)).toBe(user);
  });

  it('should return an array of users', async () => {
    jest.spyOn(userService, 'findAll').mockImplementation(() => mockUsers);
    expect(await userController.findAll()).toBe(mockUsers);
  });

  it('should return a single user', async () => {
    const user = mockUsers[0];
    jest.spyOn(userService, 'findOne').mockImplementation(() => user);
    expect(await userController.findOne(1)).toBe(user);
  });

  it('should update a user', async () => {
    const updatedUser = { id: 1, name: 'Updated User' };
    jest.spyOn(userService, 'update').mockImplementation(() => updatedUser);
    expect(await userController.update(1, updatedUser)).toBe(updatedUser);
  });

  it('should delete a user', async () => {
    const user = mockUsers[0];
    jest.spyOn(userService, 'remove').mockImplementation(() => [user]);
    expect(await userController.remove(1)).toEqual([user]);
  });
});
