import { Product } from './product.model';

export interface Meal {
  products: Product[];
  caloriesSummary: number;
}
