import { Body, Controller, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  ActivateDto,
  AuthDto,
  ForgotPassDto,
  LoginDto,
  ManageRoleDto,
  ResetPassDto,
  VerifyOtpDto,
} from './dto/auth.dto';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../guard/auth-guard';
import { Roles } from '../decorator/roles.decorator';

@ApiTags('Auth')
@ApiSecurity('x-api-key')
@ApiBearerAuth('authorization')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() authDto: AuthDto) {
    return this.authService.register(
      authDto.username,
      authDto.email,
      authDto.password,
      authDto.mobileNumber,
    );
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto.email, loginDto.password);
  }

  @Post('forgot-password')
  forgotPassword(@Body() forgotDto: ForgotPassDto) {
    return this.authService.forgotPassword(forgotDto.email);
  }

  @Post('verify-otp')
  verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verifyOtp(verifyOtpDto.email, verifyOtpDto.otp);
  }

  @Post('reset-password')
  resetPassword(@Body() resetDto: ResetPassDto) {
    return this.authService.resetPassword(resetDto.email, resetDto.newPassword);
  }

  @Put('activate/:id')
  @UseGuards(AuthGuard)
  @Roles('admin')
  async activate(@Param('id') userId: string, @Body() data: ActivateDto) {
    return this.authService.activateUser(userId, data.isEnable);
  }

  @Put('manage-roles/:id')
  @UseGuards(AuthGuard)
  @Roles('admin')
  async manageRoles(@Param('id') userId: string, @Body() data: ManageRoleDto) {
    return this.authService.managingRole(userId, data.role);
  }
}
