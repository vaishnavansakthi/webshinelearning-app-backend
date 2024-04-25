import { ApiProperty } from "@nestjs/swagger";

export class CreateCourseDto {
  

  @ApiProperty({
    required: true,
    example: 'Available seats count',
  })
  availableSeats?: number;

  @ApiProperty({
    required: true,
    example: 'Course booked or not',
  })
  isCourseBooked?: boolean;

  @ApiProperty({
    required: true,
    example: 'Username',
  })
  username?: string;

  @ApiProperty({
    required: true,
    example: 'Email',
  })
  email?: string;

  @ApiProperty({
    required: true,
    example: 'Phone number',
  })
  phone?: string;

  orders?: number;
}
