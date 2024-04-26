import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as nodemailer from 'nodemailer';
import { BookingModel } from './model/booking.entity';
import { CreateCourseDto } from './dto/booking.dto';

@Injectable()
export class BookingService {
  constructor(
    @InjectRepository(BookingModel)
    private bookingRepository: Repository<BookingModel>,
  ) {}

  async createBooking(createCourseDto: CreateCourseDto, userSeats: number) {
    const courses = Array(userSeats)
      .fill(null)
      .map((_, index) => {
        return this.bookingRepository.create({
          availableSeats: userSeats,
          isCourseBooked: false,
          username: createCourseDto.username,
          email: createCourseDto.email,
          phone: createCourseDto.phone,
          order: index + 1
        });
      });

    return this.bookingRepository.save(courses);
  }
  async bookCourse(bookingId: string, createCourseDto: CreateCourseDto) {
    const course = await this.bookingRepository.findOneBy({ id: bookingId });
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

    await this.sendEmail(createCourseDto.email, createCourseDto.username)

    await this.bookingRepository.save(course);

    const allBookings = await this.bookingRepository.find();

    const reorderedBookings = allBookings.sort((a: any, b: any) => {
      return a.originalOrder - b.originalOrder;
    });

    return reorderedBookings;

    
  }
  
  private async sendEmail(email: string, username: string) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.AUTH_EMAIL,
      to: email,
      subject: 'Course booked successfully',
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset OTP</title>
        <style>
        body {
          font-family: Arial, sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 0;
      }
      .container {
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #333333;
        text-align: center;
        font-family: 'Roboto', sans-serif; /* Fancy font */
        font-size: 18px; /* Larger font size */
        margin-bottom: 20px; /* Add some space below */
        text-transform: uppercase; /* Convert text to uppercase */
        letter-spacing: 2px; /* Increase letter spacing */
      }
      h3 {
        text-align: center;
      }
      p {
          color: #555555;
          line-height: 1.5;
      }
      .otp-code {
          font-size: 18px;
          font-weight: bold;
          color: #007bff;
          text-align: center;
          margin-top: 20px;
          letter-spacing: 3px;
      }
      .note {
          font-size: 14px;
          color: #777777;
          text-align: center;
          margin-top: 20px;
      }
      .footer {
          margin-top: 20px;
          text-align: center;
      }
        </style>
      </head>
      <body>
        <div class="container">
          <h1><span style="color: #FFA500;">Hello,</span>${username}</h1>
          <h3>Your Course booked successfully 🎉🪅</h3>
          <p class="note">Please take a screenshot and share it with the webshine mentor to get onboarded your admission</p>
        </div>
      </body>
      </html>
    `,
    };

    await transporter.sendMail(mailOptions);
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
    return this.bookingRepository.save({ ...course, ...createCourseDto });
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
