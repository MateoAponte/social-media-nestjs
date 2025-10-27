import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Subcategories } from '../enum/Subcategories';
import { Type } from 'class-transformer';

export class GetCategoryDto {
  @Type(() => Number)
  @IsNotEmpty()
  @IsInt()
  id: number;

  @IsOptional()
  @IsString()
  @IsEnum(Subcategories, {
    message: 'Esa categoría no esta incluida, gas',
  })
  subcategory: Subcategories;
}
