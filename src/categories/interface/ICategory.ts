import { Subcategories } from '../enum/Subcategories';

export interface ICategory {
  id: number;
  name: string;
  description: string;
  subcategories: Subcategories[];
}
