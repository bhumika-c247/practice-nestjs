import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsOptional()
  firstName: string;

  @IsOptional()
  lastName: string;
}
