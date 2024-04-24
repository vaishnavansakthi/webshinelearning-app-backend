import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookingModel } from './model/booking.entity';
import { CreateCourseDto } from './dto/booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingModel)
    private bookingRepository: Repository<BookingModel>,
  ) {}

  async createBooking(createCourseDto: CreateCourseDto, userSeats: number) {
    const courses = Array(userSeats).fill(null).map(() => {
      return this.bookingRepository.create({
        availableSeats: userSeats,
        isCourseBooked: false,
        username: createCourseDto.username,
        email: createCourseDto.email,
        phone: createCourseDto.phone,
      });
    });
  
    return this.bookingRepository.save(courses);
  }
  async bookCourse(bookingId: string, createCourseDto: CreateCourseDto) {
    const course = await this.bookingRepository.findOneBy({id: bookingId});
    if (!course) {
      throw new NotFoundException(`Course with ID ${bookingId} not found`);
    }
    if (course.availableSeats <= 0) {
      throw new Error('No available seats for this course');
    }
    course.isCourseBooked = true;

    course.username = createCourseDto.username;
    course.email = createCourseDto.email;
    course.phone = createCourseDto.phone;

    return this.bookingRepository.save(course);
  }

  async cancelBooking(bookingId: string) {
    const course = await this.bookingRepository.findOneBy({ id: bookingId });
    if (!course) {
      throw new NotFoundException(`Course with ID ${bookingId} not found`);
    }
    course.isCourseBooked = false;
    course.availableSeats += 1;
    return this.bookingRepository.save(course);
  }

  async getAllBookings() {
    return this.bookingRepository.find();
  }

  async getBookingById(bookingId: string) {
    return this.bookingRepository.findOneBy({ id: bookingId });
  }

  async updateBooking(bookingId: string, createCourseDto: CreateCourseDto) {
    const course = await this.bookingRepository.findOneBy({ id: bookingId });
    if (!course) {
      throw new NotFoundException(`Course with ID ${bookingId} not found`);
    }
    return this.bookingRepository.save({...course,...createCourseDto });
  }

  async deleteBooking(bookingId: string) {
    const course = await this.bookingRepository.findOneBy({ id: bookingId });
    if (!course) {
      throw new NotFoundException(`Course with ID ${bookingId} not found`);
    }
    return this.bookingRepository.delete(bookingId);
  }

  async deleteAllBookings() {
    return this.bookingRepository.delete({});
  }
}
