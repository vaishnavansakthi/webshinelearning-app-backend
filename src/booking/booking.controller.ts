import {
  Controller,
  Post,
  Body,
  Param,
  Get,
  Patch,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { BookingService } from './booking.service';
import { CreateCourseDto } from './dto/booking.dto';
import { AuthGuard } from '../guard/auth-guard';
import { Roles } from '../../src/decorator/roles.decorator';

@ApiTags('Booking')
@ApiSecurity('x-api-key')
@ApiBearerAuth('authorization')
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Post()
  @Roles('admin')
  async createBooking(
    @Body() createCourseDto: CreateCourseDto,
    @Body('userSeats') userSeats: number,
  ) {
    return this.bookingService.createBooking(createCourseDto, userSeats);
  }

  @Put('/:id/book')
  @Roles('admin', 'user', 'mentor')
  async bookCourse(
    @Param('id') bookingId: string,
    @Body() updateData: Partial<CreateCourseDto>,
  ) {
    return this.bookingService.bookCourse(bookingId, updateData);
  }


  
  @Patch('/:id/cancel')
  @Roles('admin', 'user', 'mentor')
  async cancelBooking(@Param('id') bookingId: string) {
    return this.bookingService.cancelBooking(bookingId);
  }

 
  @Get()
  @Roles('admin', 'user')
  async getAllBookings() {
    return this.bookingService.getAllBookings();
  }
  
  @Get('/:id')
  @Roles('admin', 'user')
  async getBookingById(@Param('id') bookingId: string) {
    return this.bookingService.getBookingById(bookingId);
  }


  @Patch('/:id')
  @Roles('admin', 'user', 'mentor')
  async updateBooking(
    @Param('id') bookingId: string,
    @Body() createCourseDto: CreateCourseDto,
  ) {
    return this.bookingService.updateBooking(bookingId, createCourseDto);
  }

  @Delete('/:id')
  @Roles('admin')
  async deleteBooking(@Param('id') bookingId: string) {
    return this.bookingService.deleteBooking(bookingId);
  }

  @Delete()
  @Roles('admin')
  async deleteAllBookings() {
    return this.bookingService.deleteAllBookings();
  }
}
