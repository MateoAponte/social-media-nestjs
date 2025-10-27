import {
  IsArray,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Activities } from '../enums/Activities';
import { Roles } from '../enums/Roles';

export class CreateUserDto {
  @IsString()
  @MinLength(4)
  @MaxLength(100)
  name: string;

  @IsEmail()
  @MinLength(10)
  @MaxLength(100)
  @IsNotEmpty()
  email: string;

  // @Matches(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d{3,})(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  // )
  @MinLength(10)
  @MaxLength(100)
  @IsNotEmpty()
  password: string;

  @IsEnum(Roles)
  @IsNotEmpty()
  role: Roles;

  @IsArray()
  @IsEnum(Activities, {
    each: true,
  })
  @IsNotEmpty({
    each: true,
  })
  activities: Activities[];
}
