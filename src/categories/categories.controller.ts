import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { GetCategoryDto } from './dtos/get-category.dto';
import { CategoriesService } from './providers/categories.service';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { CategoriesRepositoryService } from './providers/categories.repository.service';
import { Categories } from './categories.entity';

@Controller('categories')
export class CategoriesController {
  constructor(
    /**
     * Inject categories Service
     */
    private readonly categoriesService: CategoriesService,
    /**
     * Inject Repository Service
     */
    @Inject()
    private readonly categoriesRepositoryService: CategoriesRepositoryService,
  ) {}

  @Get('/:id{/:subcategory}')
  getCategory(@Param() param: GetCategoryDto) {
    if (!!param.subcategory) {
      return this.categoriesService.getSubcategories(
        param.id,
        param.subcategory,
      );
    } else {
      return this.categoriesService.getCategory(param.id);
    }
  }

  @Post('/create-category')
  createCategory(@Body() body: CreateCategoryDto) {
    return this.categoriesRepositoryService.createCategory(body);
  }
}
