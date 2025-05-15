// src/auth/jwt-auth.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(context: ExecutionContext): boolean {
    console.log('JwtAuthGuard triggered LJT9');
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) return false;

    const token = authHeader.split(' ')[1];
    console.log('Token: LJT13', token); // Debugging line
    try {
      const decoded = this.jwtService.verify(token);
      request.user = decoded; // attach user to request
     console.log('Decoded Token: LJT16', decoded); // Debugging line
      return true;
    } catch (err) {
      return false;
    }
  }
}
