import { User } from 'src/user/entities/user.entity';
import { mockUsers } from './user.fixture';

export const mockUserRepository = {
  save: jest.fn((user: User) => {
    const existingUser = mockUsers.find((u) => u.id === user.id);
    if (existingUser) {
      Object.assign(existingUser, user);
      return existingUser;
    } else {
      mockUsers.push(user);
      return user;
    }
  }),
  find: jest.fn(() => mockUsers),
  findOne: jest.fn((id: number) => mockUsers.find((user) => user.id === id)),
  delete: jest.fn((id: number) => {
    const index = mockUsers.findIndex((user) => user.id === id);
    if (index === -1) {
      return null;
    }
    return mockUsers.splice(index, 1);
  }),
};

export const mockUserService = {
  create: jest.fn((user: User) => mockUserRepository.save(user)),
  findAll: jest.fn(() => mockUserRepository.find()),
  findOne: jest.fn((id: number) => mockUserRepository.findOne(id)),
  update: jest.fn((id: number, user: User) =>
    mockUserRepository.save({ ...user, id }),
  ),
  remove: jest.fn((id: number) => mockUserRepository.delete(id)),
};

// export const mockUserService = {
//   findAll: jest.fn(() => []),
//   findOne: jest.fn((id) => ({ id, name: 'Test User' })),
//   // More mock implementations...
// };

// export const mockUserRepository = {
//   save: jest.fn((user) => user),
//   find: jest.fn(() => []),
//   findOne: jest.fn((id) => ({ id, name: 'Test User' })),
//   // More mock implementations...
// };
