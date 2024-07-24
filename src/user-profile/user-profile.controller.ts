import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UserProfileService } from './user-profile.service';
import { UserProfile } from './entities/user-profile.entity';

@Controller('profiles')
export class UserProfileController {
  constructor(private readonly userProfileService: UserProfileService) {}

  @Post()
  create(@Body() profile: UserProfile): Promise<UserProfile> {
    return this.userProfileService.create(profile);
  }

  @Get()
  findAll(): Promise<UserProfile[]> {
    return this.userProfileService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<UserProfile> {
    return this.userProfileService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() profile: UserProfile,
  ): Promise<UserProfile> {
    return this.userProfileService.update(id, profile);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<UserProfile> {
    return this.userProfileService.remove(id);
  }
}
