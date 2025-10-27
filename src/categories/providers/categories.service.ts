import { Injectable } from '@nestjs/common';
import { CATEGORIES_DATA } from '../constants/CategoriesData';
import { ICategory } from '../interface/ICategory';
import { Subcategories } from '../enum/Subcategories';

@Injectable()
export class CategoriesService {
  getCategory(id: number) {
    return CATEGORIES_DATA.find((category: ICategory) => category.id === id);
  }

  getSubcategories(id: number, subcategory: Subcategories) {
    return this.getCategory(id)?.subcategories.find(
      (subcategoryItem: Subcategories) => subcategory === subcategoryItem,
    );
  }
}
