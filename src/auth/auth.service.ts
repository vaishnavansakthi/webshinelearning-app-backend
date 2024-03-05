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
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthEntity) private repository: Repository<AuthEntity>,
    private jwtService: JwtService,
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
    const resData = await this.repository.save(res);
    const token = await this.jwtService.signAsync(
      {
        id: resData.id,
        username: resData.username,
        email: resData.email,
      },
      { secret: process.env.JWT_SECRET },
    );
    return {
      access_token: token,
      user: {
        username: resData.username,
        email: resData.email,
        mobileNumber: resData.mobileNumber
      },
    };
  }

  async login(email: string, password: string) {
    const user = await this.repository.findOneBy({ email: email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.jwtService.signAsync(
      { id: user.id, username: user.username, email: user.email },
      { secret: process.env.JWT_SECRET },
    );
    return {
      access_token: token,
      user: {
        username: user.username,
        email: user.email,
        mobileNumber: user.mobileNumber
      },
    };
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

    user.resetPasswordToken = otp;
    await this.repository.save(user);

    await this.sendEmail(email, otp);

    return otp;
  }

  async resetPassword(email: string, otp: string, newPassword: string) {
    const user = await this.repository.findOneBy({ email: email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.resetPasswordToken !== otp) {
      throw new UnauthorizedException('Invalid OTP');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    user.resetPasswordToken = null;
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
