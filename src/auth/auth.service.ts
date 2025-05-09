import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async signup(email: string, password: string, fullName: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user:any = await this.usersService.create({ email, password: hashedPassword, fullName,isActive: true });
    return { message: 'Signup successful', userId: user._id };
  }

  async login(email: string, password: string) {
    const user:any = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign(
      { sub: user._id, email: user.email }, // ⏱️ Token will expire in 3600 seconds
    );  return { access_token: token };
  }
}
