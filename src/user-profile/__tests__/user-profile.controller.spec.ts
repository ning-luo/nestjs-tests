import { Test, TestingModule } from '@nestjs/testing';
import { UserProfileController } from '../user-profile.controller';
import { UserProfileService } from '../user-profile.service';
import {
  mockProfiles,
  createMockProfile,
} from './helpers/user-profile.fixture';
// import { getRepositoryToken } from '@nestjs/typeorm';
// import { UserProfile } from '../entities/user-profile.entity';
import { mockUserProfileService } from './helpers/user-profile.mock';

describe('UserProfileController', () => {
  let userProfileController: UserProfileController;
  let userProfileService: UserProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserProfileController],
      providers: [
        UserProfileService,
        {
          // provide: getRepositoryToken(UserProfile),
          // useValue: {
          //   save: jest.fn(),
          //   find: jest.fn(),
          //   findOne: jest.fn(),
          //   delete: jest.fn(),
          // },
          provide: UserProfileService,
          useValue: mockUserProfileService,
        },
      ],
    }).compile();

    userProfileController = module.get<UserProfileController>(
      UserProfileController,
    );
    userProfileService = module.get<UserProfileService>(UserProfileService);
    userProfileService['profiles'] = [...mockProfiles];
  });

  it('should be defined', () => {
    expect(userProfileController).toBeDefined();
  });

  it('should create a profile', async () => {
    const profile = createMockProfile(3, 'New Profile');
    jest.spyOn(userProfileService, 'create').mockImplementation(() => profile);
    expect(await userProfileController.create(profile)).toBe(profile);
  });

  it('should return an array of profiles', async () => {
    jest
      .spyOn(userProfileService, 'findAll')
      .mockImplementation(() => mockProfiles);
    expect(await userProfileController.findAll()).toBe(mockProfiles);
  });

  it('should return a single profile', async () => {
    const profile = mockProfiles[0];
    jest.spyOn(userProfileService, 'findOne').mockImplementation(() => profile);
    expect(await userProfileController.findOne(1)).toBe(profile);
  });

  it('should update a profile', async () => {
    const updatedProfile = { id: 1, bio: 'Updated Profile' };
    jest
      .spyOn(userProfileService, 'update')
      .mockImplementation(() => updatedProfile);
    expect(await userProfileController.update(1, updatedProfile)).toBe(
      updatedProfile,
    );
  });

  it('should delete a profile', async () => {
    const profile = mockProfiles[0];
    jest
      .spyOn(userProfileService, 'remove')
      .mockImplementation(() => [profile]);
    expect(await userProfileController.remove(1)).toEqual([profile]);
  });
});
