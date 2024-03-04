import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity } from './model/auth.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import * as otpGenerator from 'otp-generator';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity) private repository: Repository<AuthEntity>,
  ) {}

  async register(
    username: string,
    email: string,
    password: string,
    mobileNumber: string,
  ) {
    const user = await this.repository.findOneBy({ email: email });
    if (user) {
      throw new BadRequestException('User Already Exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = new AuthEntity();
    userData.username = username;
    userData.email = email;
    userData.password = hashedPassword;
    userData.mobileNumber = mobileNumber;
    const res = await this.repository.create(userData);
    return this.repository.save(res);
  }

  async login(email: string, password: string) {
    console.log(email);
    const user = await this.repository.findOneBy({ email: email });
    console.log(user);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async forgotPassword(email: string) {
    const user = await this.repository.findOneBy({ email: email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const otp = otpGenerator.generate(6, {
      digits: true,
      alphabets: false,
      upperCase: false,
      specialChars: false,
    });
    
    await this.sendEmail(email, otp);

    return otp;
  }

  async resetPassword(email: string, otp: string, newPassword: string) {
    const user = await this.repository.findOneBy({ email: email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    await this.repository.save(user);

    return 'Password reset successfully';
  }

  private async sendEmail(email: string, otp: string) {
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
      subject: 'Password Reset OTP',
      text: `${otp} is your webshinelearning portal reset password otp code`,
    };

    await transporter.sendMail(mailOptions);
  }
}
