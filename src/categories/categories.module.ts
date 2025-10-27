import { Module } from '@nestjs/common';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './providers/categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categories } from './categories.entity';
import { CategoriesRepositoryService } from './providers/categories.repository.service';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, CategoriesRepositoryService],
  imports: [TypeOrmModule.forFeature([Categories])],
})
export class CategoriesModule {}
