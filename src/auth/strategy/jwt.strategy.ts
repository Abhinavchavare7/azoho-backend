import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET! || 'supersecretkey',
    });
  }

  async validate(payload: any) {
    console.log('JWT payload: Lj15', payload); // Log the payload for debugging
    return { userId: payload.userId, email: payload.email };
  }
}
