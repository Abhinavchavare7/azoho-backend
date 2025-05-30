import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './schemas/profile.schema';
import { Model, Types } from 'mongoose';
// import { CreateProfileDto } from './dto/create-profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  async createProfile(data: any, userId: string) {
    const newProfile = new this.profileModel({
      ...data,
      userId: new Types.ObjectId(userId),
    });
    return newProfile.save();
  }

  async getProfileByUserId(userId: string):Promise<Profile | null> {
    console.log('User ID: Lg23', userId); // Debugging line
    const profile = await this.profileModel.findOne({ userId: new Types.ObjectId(userId) }).lean();// Debugging line
 if (!profile) return null;

  // Convert ObjectId to string
  return {
    ...profile,
    userId: profile.userId.toString(),
  };
  }
}
