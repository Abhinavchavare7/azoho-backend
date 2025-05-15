import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsBoolean } from 'class-validator';

export class GetUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  userId?: string;
  
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  message?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  access_token?: string;
}