import { IsNotEmpty, IsString } from 'class-validator';

export class EncryptDto {
  @IsString()
  @IsNotEmpty()
  ATSecret: string;

  @IsString()
  @IsNotEmpty()
  RTSecret: string;
}
