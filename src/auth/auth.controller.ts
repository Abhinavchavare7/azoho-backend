import { Controller, Post, Body,UseGuards ,Get,Request,Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService
  ) {}
  
  @Post('signup')
  signup(@Body() body: { email: string; password: string; fullName: string }) {
    return this.authService.signup(body.email, body.password, body.fullName);
  }

  @Post('login')
  login(@Body() body: { email: string; password: string }) {
    return this.authService.login(body.email, body.password);
  }
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getMe(@Req() req: Request) {
    const userId = (req as any).user.id; // user is attached by the JwtAuthGuard
    const user = await this.userService.findById(userId);
    return user;
  }
}
