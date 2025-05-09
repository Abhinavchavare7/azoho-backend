import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { CreateProfileDto } from './dto/create-profile.dto';
import { Request } from 'express';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post()
  async create(@Body() body: any, @Req() req: Request) {
    // console.log('Request Body: L10', req.user); // Debugging line
    const user = req.user as { sub: string };
    console.log('User ID: L15', user.sub); // Debugging line
    return this.profileService.createProfile(body, user.sub);
  }

  @Get()
  async getMyProfile(@Req() req: Request) {
    const user = req.user as { sub: string };
    console.log('User ID: L21', user.sub); // Debugging line
    let data= await this.profileService.getProfileByUserId(user.sub);
    console.log('Data: Lr23', data); // Debugging line
    return data;
  }
}
