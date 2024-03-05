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
import { ProfileDto } from './dto/auth.dto';

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
        role: resData.role
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
        role: resData.role
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
      { id: user.id, username: user.username, email: user.email, role: user.role },
      { secret: process.env.JWT_SECRET },
    );
    return {
      access_token: token,
      user: {
        username: user.username,
        email: user.email,
        mobileNumber: user.mobileNumber,
        isActivate: user.isActivate,
        role: user.role
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

  async activateUser(userId, isEnable){
    const user = await this.repository.findOneBy({ id: userId  });
    if(!user.isActivate){
      user.isActivate = isEnable
    }
    return this.repository.save(user)
  }

  async managingRole(userId: string, role: string){
    const user = await this.repository.findOneBy({ id: userId  });
    console.log(user)
    if(role === "admin"){
      user.role = Role.ADMIN
    }else if (role === "mentor"){
      user.role = Role.MENTOR
    }else if(role === "user"){
      user.role = Role.USER
    }
    return this.repository.save(user)
  }

  async updateProfile(userId: string, updateUserDto: ProfileDto) {
    const user = await this.repository.findOneBy({ id: userId  });
    console.log(user)
    if (updateUserDto.dateOfBirth) {
      user.dateOfBirth = updateUserDto.dateOfBirth;
    }
    if (updateUserDto.hobby) {
      user.hobby = updateUserDto.hobby;
    }
    if (updateUserDto.favoriteProgrammingLanguage) {
      user.favoriteProgrammingLanguage = updateUserDto.favoriteProgrammingLanguage;
    }

    return this.repository.save(user)
  }
}
