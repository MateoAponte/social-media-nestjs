import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories } from '../categories.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dtos/create-category.dto';

@Injectable()
export class CategoriesRepositoryService {
  constructor(
    @InjectRepository(Categories) private repo: Repository<Categories>,
  ) {}

  createCategory(category: CreateCategoryDto) {
    const localCategory = this.repo.create(category); // Crear categoría
    return this.repo.save(localCategory); // Guardandola en DB
  }
}
