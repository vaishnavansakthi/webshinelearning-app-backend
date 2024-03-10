import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthEntity, Role } from './model/auth.entity';
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
        role: resData.role,
      },
      { secret: process.env.JWT_SECRET },
    );
    return {
      access_token: token,
      user: {
        username: resData.username,
        email: resData.email,
        mobileNumber: resData.mobileNumber,
        isActivate: resData.isActivate,
        role: resData.role,
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
      {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
      { secret: process.env.JWT_SECRET },
    );
    return {
      access_token: token,
      user: {
        username: user.username,
        email: user.email,
        mobileNumber: user.mobileNumber,
        isActivate: user.isActivate,
        role: user.role,
      },
    };
  }

  async googleLogin(req) {
    const userData = await this.repository.findOneBy({ email: req.user.email });
    if(!req.user){
      return "No User Found"
    }
    return {
      message: "User Info from google",
      user: {
        username: userData.username,
        email: userData.email,
        mobileNumber: userData.mobileNumber,
        isActivate: userData.isActivate,
        role: userData.role,
        ...req.user
      },
    }
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

    await this.sendEmail(email, otp, user.username);

    return 'Please check your mail for otp';
  }

  async verifyOtp(email: string, otp: string) {
    const user = await this.repository.findOneBy({ email: email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.resetPasswordToken !== otp) {
      throw new UnauthorizedException('Invalid OTP');
    }

    return 'OTP verified';
  }

  async resetPassword(email: string, newPassword: string) {
    const user = await this.repository.findOneBy({ email: email });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;

    user.resetPasswordToken = null;
    await this.repository.save(user);

    return 'Password reset successfully';
  }

  private async sendEmail(email: string, otp: string, username: string) {
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
          <p>Password Reset OTP</p>
          <p>Your OTP code for resetting your password is:</p>
          <p class="otp-code">${otp}</p>
          <p class="note">Please do not share this OTP code with anyone for security reasons.</p>
          <div class="footer">
          <p>If you did not request this OTP, please ignore this email.</p>
          <p>Thanks,<br>Webshinelearning</p> 
        </div>
        </div>
      </body>
      </html>
    `,
    };

    await transporter.sendMail(mailOptions);
  }

  async activateUser(userId, isEnable) {
    const user = await this.repository.findOneBy({ id: userId });
    if (!user.isActivate) {
      user.isActivate = isEnable;
    }
    return this.repository.save(user);
  }

  async managingRole(userId: string, role: string) {
    const user = await this.repository.findOneBy({ id: userId });
    console.log(user);
    if (role === 'admin') {
      user.role = Role.ADMIN;
    } else if (role === 'mentor') {
      user.role = Role.MENTOR;
    } else if (role === 'user') {
      user.role = Role.USER;
    }
    return this.repository.save(user);
  }
}
