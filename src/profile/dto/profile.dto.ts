import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional, IsString } from 'class-validator';

export class ProfileDto {
  id: string;

  @ApiProperty({
    required: true,
    example: 'B.Sc IT',
  })
  @IsString()
  degree: string;

  @IsString()
  @IsOptional()
  university: string;

  @IsString()
  @IsOptional()
  graduationYear: string;

  @IsString()
  @IsOptional()
  fieldOfStudy: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  hobbies: string;

  @IsDateString()
  @IsOptional()
  dateOfBirth: string;

  @IsString()
  userId: string;
}
