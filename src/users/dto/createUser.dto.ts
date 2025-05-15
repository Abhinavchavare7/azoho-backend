import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty({required:true})
  @IsString()
  password?: string;
  
  @ApiProperty()
    @IsOptional()
  @IsString()
  fullName?: string;
}