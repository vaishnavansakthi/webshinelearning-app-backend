import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class AuthDto {
  id: string;

  @ApiProperty({
    example: 'Sakthi',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(2, 15)
  username: string;

  @ApiProperty({
    example: 'test@gmail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'dg473993@123D',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 15)
  password: string;

  @ApiProperty({
    example: '8978967879',
    required: true,
  })
  @IsNumberString()
  @Length(10, 10)
  mobileNumber: string;

  resetPasswordToken: string;

  @IsOptional()
  @IsDateString()
  dateOfBirth?: Date;

  @IsOptional()
  @IsString()
  hobby?: string;

  @IsOptional()
  @IsString()
  favoriteProgrammingLanguage?: string;
}

export class LoginDto {
  @ApiProperty({
    example: 'test@gmail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'dg473993@123D',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 15)
  password: string;
}

export class ForgotPassDto {
  @ApiProperty({
    example: 'test@gmail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class ResetPassDto {
  @ApiProperty({
    example: 'test@gmail.com',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: '67rt56',
    required: true,
  })
  @IsNotEmpty()
  otp: string;

  @ApiProperty({
    example: 'dg473993@123D',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 15)
  newPassword: string;
}

export class ManageRoleDto {
  @ApiProperty({
    example: 'Update role admin | mentor | user',
    required: true,
    description: 'Need admin access to manage role',
  })
  @IsString()
  @IsNotEmpty()
  role: string;
}

export class ActivateDto {
  @ApiProperty({
    example: true,
    required: true,
    description: 'Need admin access to manage role',
  })
  @IsBoolean()
  @IsNotEmpty()
  isEnable: boolean;
}
