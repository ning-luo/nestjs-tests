import { Test, TestingModule } from '@nestjs/testing';
import { UserProfileService } from '../user-profile.service';
import { mockUserProfileRepository } from './helpers/user-profile.mock';
import {
  mockProfiles,
  createMockProfile,
} from './helpers/user-profile.fixture';

describe('UserProfileService', () => {
  let userProfileService: UserProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserProfileService,
        {
          provide: 'UserProfileRepository',
          useValue: mockUserProfileRepository,
        },
      ],
    }).compile();

    userProfileService = module.get<UserProfileService>(UserProfileService);
    userProfileService['profiles'] = [...mockProfiles];
  });

  it('should be defined', () => {
    expect(userProfileService).toBeDefined();
  });

  it('should find all profiles', () => {
    const result = userProfileService.findAll();
    expect(result).toEqual(mockProfiles);
  });

  it('should find one profile', () => {
    const result = userProfileService.findOne(1);
    expect(result).toEqual(mockProfiles[0]);
  });

  it('should create a new profile', () => {
    const profile = createMockProfile(3, 'New Profile');
    const result = userProfileService.create(profile);
    expect(result).toEqual(profile);
    expect(userProfileService.findAll()).toContainEqual(profile);
  });

  it('should update a profile', () => {
    const updatedProfile = { id: 1, bio: 'Updated Profile' };
    const result = userProfileService.update(1, updatedProfile);
    expect(result).toEqual(updatedProfile);
    expect(userProfileService.findOne(1)).toEqual(updatedProfile);
  });

  it('should remove a profile', () => {
    const result = userProfileService.remove(1);
    expect(result).toEqual([mockProfiles[0]]);
    expect(userProfileService.findAll()).not.toContainEqual(mockProfiles[0]);
  });
});
