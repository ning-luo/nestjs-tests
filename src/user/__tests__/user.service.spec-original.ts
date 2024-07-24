import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../user.service';
import { mockUserRepository } from './helpers/user.mock';
import { mockUsers, createMockUser } from './helpers/user.fixture';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

// This is the normal way of NestJS service unit test. We can separate all the tests into
// separate files to make the tests more readable. Here this test files has been separated into
//   user.service.setup.ts  -  the test setup related stuff
//   user.service.find.spec.ts  -  the test for all find related features
//   user.service.create.spec.ts  -  the test for all create, update and delete features
// To do achieve this, we need to setup <root>/jest.config.ts
// For unit test, we also need to setup <root>/test/jest-unit.json
// To run the unit tests, we need to use `jest --config ./test/jest-unit.json`. This is set in package.json in script of "test"
describe('UserService', () => {
  let userService: UserService;

  beforeEach(async () => {
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

    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  // it('should find all users', async () => {
  //   const result = await userService.findAll();
  //   expect(result).toEqual([]);
  // });

  // it('should find one user', async () => {
  //   const result = await userService.findOne(1);
  //   expect(result).toEqual({ id: 1, name: 'Test User' });
  // });

  // More tests...

  it('should find all users', () => {
    const result = userService.findAll();
    expect(result).toEqual(mockUsers);
  });

  it('should find one user', () => {
    const result = userService.findOne(1);
    expect(result).toEqual(mockUsers[0]);
  });

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
