import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CheckUserDto {
  @IsNotEmpty()
  @IsEmail()
  @MinLength(10)
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
