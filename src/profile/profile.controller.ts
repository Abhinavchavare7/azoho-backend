import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { CreateProfileDto } from './dto/create-profile.dto';
import { Request } from 'express';
import { ProfileDto } from './dto/profile.dto';
import { Profile } from './schemas/profile.schema';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Post()
  async create(@Body() body: Profile, @Req() req: Request) {
    // console.log('Request Body: L10', req.user); // Debugging line
    const user = req.user as { userId: string };
    console.log('User ID: L15', user.userId); // Debugging line
    return this.profileService.createProfile(body, user.userId);
  }

  @Get()
  async getMyProfile(@Req() req: Request): Promise<ProfileDto | null> {
    const user = req.user as { userId: string };
    const profile = await this.profileService.getProfileByUserId(user.userId);
    if (!profile) return null;

    // Destructure only DTO fields
    const {
      userId,
      basicInfo,
      contactInfo,
      work,
      personal,
      summary,
      passportDetails,
      workExperience,
      familyMediclaim2024_25,
      vehiclePassDetails,
      tags,
    } = profile;

    return {
      userId,
      basicInfo,
      contactInfo,
      work,
      personal,
      summary,
      passportDetails,
      workExperience,
      familyMediclaim2024_25,
      vehiclePassDetails,
      tags,
    };
  }
}
