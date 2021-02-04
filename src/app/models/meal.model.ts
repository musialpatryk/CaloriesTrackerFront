import { Product } from './product.model';

export interface Meal{
   //date: Date,
   products: Product[];
   caloriesSummary: number;
}
