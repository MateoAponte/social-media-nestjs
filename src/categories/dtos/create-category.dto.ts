import { IsEnum, IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Subcategories } from '../enum/Subcategories';

export class CreateCategoryDto {
  @IsInt()
  @IsNotEmpty()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(Subcategories, {
    each: true,
  })
  @IsNotEmpty({
    each: true,
  })
  subcategories: Subcategories[];
}
