import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './model/profile.entity';
import { Repository } from 'typeorm';
import { AuthEntity } from 'src/auth/model/auth.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @InjectRepository(AuthEntity)
    private userRepository: Repository<AuthEntity>,
  ) {}

  async createProfile(userId: string, degree: string) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    const profile = await this.profileRepository.create({
      degree: degree,
      user: user,
    });

    return this.profileRepository.save(profile);
  }

  async getAllProfile() {
    return this.profileRepository.find({ relations: ['user'] });
  }
}
