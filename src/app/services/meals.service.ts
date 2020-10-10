import { Injectable } from '@angular/core';
import { Meal } from '../models/meal.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  private meals: Meal[];
  private emitMeals = new Subject<Meal[]>();

  constructor() { 
    this.meals = [
      {
        products: [
          {
            name: 'Kurczak',
            grams: 100
          },
          
          {
            name: 'Kanapka',
            grams: 100
          }
        ]
      }
    ];
  }

  getMeals(): Meal[]{
    return [...this.meals];
  }

  getMealsChanged(): Observable<Meal[]>{
    return this.emitMeals.asObservable();
  }

  addNewMeal(){
    const newMeal: Meal = {
      products: [

      ]
    };
    this.meals.push(newMeal);
    this.emitMeals.next([...this.meals]);
  }

  addNewProduct(index: number){
    const newProduct = {
      name: '',
      grams: null
    }
    this.meals[index].products.push(newProduct);
    this.emitMeals.next([...this.meals]);
  }

  deleteProduct(mealIndex, productIndex){
    this.meals[mealIndex].products.splice(productIndex , 1);
    this.emitMeals.next([...this.meals]);
  }

  changeProductName(newValue, mealIndex, productIndex) {
    this.meals[mealIndex].products[productIndex].name = newValue;
    this.emitMeals.next([...this.meals]);
  }

  changeProductGrams(newValue, mealIndex, productIndex) {
    this.meals[mealIndex].products[productIndex].grams = newValue;
    this.emitMeals.next([...this.meals]);
  }

  // TODO: To decide: getProducts, getProductsChanged or update products -> without subscription. 
}
