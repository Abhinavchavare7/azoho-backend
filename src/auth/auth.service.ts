import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/schemas/user.schema';
import { GetUserDto } from 'src/users/dto/getUser.dto';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { LoginUserDto } from 'src/users/dto/loginUser.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async signup({email,password,fullName}:CreateUserDto): Promise<GetUserDto | null> {
    if (!password || !fullName) {
    throw new BadRequestException('Password and fullName are required');
  }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user: any = await this.usersService.create({ email, password: hashedPassword, fullName, isActive: true });
    return { message: 'Signup successful Please login.', userId: user._id, email: user.email };
  }

  async login({email,password}:LoginUserDto): Promise<GetUserDto | null> {
    const user: any = await this.usersService.findByEmail(email);
    if (!user) throw new UnauthorizedException('User not found');
    if (!password) {
    throw new BadRequestException('Password and fullName are required');
  }

    const passwordMatch = await bcrypt.compare(password, user.password!);
    if (!passwordMatch) throw new UnauthorizedException('Invalid credentials');

    const token = this.jwtService.sign(
      { userId: user._id, email: user.email }, // ⏱️ Token will expire in 3600 seconds
    );
    return { userId: user._id, email: user.email, access_token: token };
  }
}
