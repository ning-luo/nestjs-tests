import { UserProfileService } from '../user-profile.service';
import { setupUserProfileServiceTestModule } from './user-profile.service.setup';
import {
  mockProfiles,
  createMockProfile,
} from './helpers/user-profile.fixture';

describe('UserProfileService', () => {
  let userProfileService: UserProfileService;

  beforeEach(async () => {
    const module = await setupUserProfileServiceTestModule();
    userProfileService = module.userProfileService;
    userProfileService['profiles'] = [...mockProfiles];
  });

  it('should be defined', () => {
    expect(userProfileService).toBeDefined();
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
