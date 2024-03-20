import { Injectable, NotFoundException } from '@nestjs/common';
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

  async createProfile(
    userId: string,
    degree: string,
    university: string,
    graduationYear: string,
    fieldOfStudy: string,
    dateOfBirth: string,
    description: string,
    hobbies: string,
  ) {
    const user = await this.userRepository.findOneBy({ id: userId });

    if (!user) {
      throw new Error(`User with id ${userId} not found`);
    }

    const profile = await this.profileRepository.create({
      university: university,
      degree: degree,
      graduationYear: graduationYear,
      fieldOfStudy: fieldOfStudy,
      dateOfBirth: dateOfBirth,
      description: description,
      hobbies: hobbies,
      user: user,
    });

    return this.profileRepository.save(profile);
  }

  async getProfileById(profileId: string): Promise<any> {
    const profile = await this.profileRepository.find({
      where: { id: profileId },
      relations: ['user'],
    });

    if (!profile) {
      throw new NotFoundException(`Profile with id ${profileId} not found`);
    }

    return profile;
  }

  async getAllProfile() {
    return this.profileRepository.find({ relations: ['user'] });
  }

  async updateProfile(
    profileId: string,
    updatedData: Partial<Profile>,
  ): Promise<Profile> {
    const profile = await this.profileRepository.findOneBy({ id: profileId });

    if (!profile) {
      throw new NotFoundException(`Profile with id ${profileId} not found`);
    }

    if (updatedData.user) {
      const updatedUserId = updatedData.user.id;
      const user = await this.userRepository.findOneBy({ id: updatedUserId });

      if (!user) {
        throw new NotFoundException(`User with id ${updatedUserId} not found`);
      }

      profile.user = user;
      delete updatedData.user;
    }

    Object.assign(profile, updatedData);

    return this.profileRepository.save(profile);
  }
}
