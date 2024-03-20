import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDto } from './dto/profile.dto';
import { AuthGuard } from '../guard/auth-guard';
import { Roles } from 'src/decorator/roles.decorator';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { Profile } from './model/profile.entity';

@ApiTags('Profile')
@ApiSecurity('x-api-key')
@ApiBearerAuth('authorization')
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Roles('admin', 'mentor', 'user')
  createProfile(@Body() profileDto: ProfileDto) {
    const {
      userId,
      degree,
      university,
      graduationYear,
      fieldOfStudy,
      dateOfBirth,
      description,
      hobbies,
    } = profileDto;
    return this.profileService.createProfile(
      userId,
      degree,
      university,
      graduationYear,
      fieldOfStudy,
      dateOfBirth,
      description,
      hobbies,
    );
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @Roles('admin', 'mentor', 'user')
  async getProfileById(@Param('id') id: string): Promise<Profile> {
    return this.profileService.getProfileById(id);
  }

  @Get()
  @UseGuards(AuthGuard)
  @Roles('admin', 'mentor', 'user')
  getAllProfile() {
    return this.profileService.getAllProfile();
  }

  @UseGuards(AuthGuard)
  @Roles('admin')
  @Put(':id')
  async updateProfile(
    @Param('id') id: string,
    @Body() updateProfileDto: ProfileDto,
  ): Promise<Profile> {
    const { userId, ...rest } = updateProfileDto;
    const profileId = id;

    const updatedProfileData: Partial<any> = { ...rest };

    if (userId) {
      updatedProfileData.user = { id: userId };
    }

    try {
      return this.profileService.updateProfile(profileId, updatedProfileData);
    } catch (error) {
      throw new NotFoundException(`Profile with id ${id} not found`);
    }
  }
}
