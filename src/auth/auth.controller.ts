import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, ForgotPassDto, LoginDto, ResetPassDto } from './dto/auth.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from './guard/auth-guard';

@ApiTags('Auth')
@ApiSecurity('x-api-key')
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
    return this.authService.login(loginDto.email, loginDto.password)
  }

  @Post('forgot-password')
  forgotPassword(@Body() forgotDto: ForgotPassDto){
    return this.authService.forgotPassword(forgotDto.email)
  }
  
  @Post('reset-password')
  resetPassword(@Body() resetDto: ResetPassDto){
    return this.authService.resetPassword(resetDto.email, resetDto.otp, resetDto.newPassword)
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
