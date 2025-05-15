import { Controller, Post, Body, UseGuards, Get, Req, NotFoundException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from '../users/users.service';
import { AuthMeDto } from 'src/users/dto/authMe.dto'; ``
import { ApiTags, ApiBearerAuth, ApiResponse } from '@nestjs/swagger';
import { GetUserDto } from 'src/users/dto/getUser.dto';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { LoginUserDto } from 'src/users/dto/loginUser.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) { }

  @Post('signup')
  @ApiResponse({ status: 201, description: 'User registered.' })
  signup(@Body() body: CreateUserDto): Promise<GetUserDto | null> {
    return this.authService.signup(body);
  }

  @Post('login')
  @ApiResponse({ status: 200, description: 'User logged in.' })
  login(@Body() body: LoginUserDto): Promise<GetUserDto | null> {
    return this.authService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  @ApiBearerAuth()
  @ApiResponse({ status: 200, type: AuthMeDto })
  async getMe(@Req() req): Promise<AuthMeDto> {
    const userId = (req as any).user.userId;
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    console.log("user in auth me L38", user);
    // Optionally, map the user document to DTO if needed
    return {
      email: user.email, // Consider omitting password in real APIs!
      fullName: user.fullName,
      isActive: user.isActive || false,
    };
  }
}
