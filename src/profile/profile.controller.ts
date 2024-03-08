import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDto } from './dto/profile.dto';
import { AuthGuard } from '../guard/auth-guard';
import { Roles } from 'src/decorator/roles.decorator';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';

@ApiTags('Profile')
@ApiSecurity('x-api-key')
@ApiBearerAuth('authorization')
@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  // b8c253c9-abd3-4997-bda3-6104885b80eb
  @Post()
  @UseGuards(AuthGuard)
  @Roles('admin', 'mentor', 'user')
  createProfile(@Body() profileDto: ProfileDto) {
    return this.profileService.createProfile(
      profileDto.userId,
      profileDto.degree,
    );
  }

  @Get()
  @UseGuards(AuthGuard)
  @Roles('admin')
  getAllProfile() {
    return this.profileService.getAllProfile();
  }
}
