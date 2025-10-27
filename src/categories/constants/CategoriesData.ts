import { Subcategories } from '../enum/Subcategories';
import { ICategory } from '../interface/ICategory';

export const CATEGORIES_DATA: ICategory[] = [
  {
    id: 1,
    name: 'Music',
    description: 'La categoría de música',
    subcategories: [
      Subcategories.DRAWING,
      Subcategories.ELECTRONIC,
      Subcategories.PUNK,
      Subcategories.ROCK,
      Subcategories.POP,
      Subcategories.COMPOSITION,
    ],
  },
  {
    id: 2,
    name: 'Visual Artist',
    description: 'La categoría de artistas visuales',
    subcategories: [
      Subcategories.ARCHITECTURE,
      Subcategories.PHOTOGRAPHY,
      Subcategories.PAINTING,
      Subcategories.COMPOSITION,
      Subcategories.DRAWING,
    ],
  },
];
