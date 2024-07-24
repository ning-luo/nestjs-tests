import { UserProfileService } from '../user-profile.service';
import { setupUserProfileServiceTestModule } from './user-profile.service.setup';
import { mockProfiles } from './helpers/user-profile.fixture';

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

  it('should find all profiles', () => {
    const result = userProfileService.findAll();
    expect(result).toEqual(mockProfiles);
  });

  it('should find one profile', () => {
    const result = userProfileService.findOne(1);
    expect(result).toEqual(mockProfiles[0]);
  });
});
