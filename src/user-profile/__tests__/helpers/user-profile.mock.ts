import { UserProfile } from 'src/user-profile/entities/user-profile.entity';
import { mockProfiles } from './user-profile.fixture';

// export const mockUserProfileService = {
//   create: jest.fn((profile) => {
//     mockProfiles.push(profile);
//     return profile;
//   }),
//   findAll: jest.fn(() => mockProfiles),
//   findOne: jest.fn((id: number) =>
//     mockProfiles.find((profile) => profile.id === id),
//   ),
//   update: jest.fn((id: number, profile) => {
//     const index = mockProfiles.findIndex((p) => p.id === id);
//     if (index === -1) {
//       return null;
//     }
//     mockProfiles[index] = { ...mockProfiles[index], ...profile };
//     return mockProfiles[index];
//   }),
//   remove: jest.fn((id: number) => {
//     const index = mockProfiles.findIndex((profile) => profile.id === id);
//     if (index === -1) {
//       return null;
//     }
//     return mockProfiles.splice(index, 1);
//   }),
// };

export const mockUserProfileService = {
  create: jest.fn((profile: UserProfile) =>
    mockUserProfileRepository.save(profile),
  ),
  findAll: jest.fn(() => mockUserProfileRepository.find()),
  findOne: jest.fn((id: number) => mockUserProfileRepository.findOne(id)),
  update: jest.fn((id: number, profile: UserProfile) =>
    mockUserProfileRepository.save({ ...profile, id }),
  ),
  remove: jest.fn((id: number) => mockUserProfileRepository.delete(id)),
};

export const mockUserProfileRepository = {
  save: jest.fn((profile: UserProfile) => {
    const existingProfile = mockProfiles.find((p) => p.id === profile.id);
    if (existingProfile) {
      Object.assign(existingProfile, profile);
      return existingProfile;
    } else {
      mockProfiles.push(profile);
      return profile;
    }
  }),
  find: jest.fn(() => mockProfiles),
  findOne: jest.fn((id: number) =>
    mockProfiles.find((profile) => profile.id === id),
  ),
  delete: jest.fn((id: number) => {
    const index = mockProfiles.findIndex((profile) => profile.id === id);
    if (index === -1) {
      return null;
    }
    return mockProfiles.splice(index, 1);
  }),
};
