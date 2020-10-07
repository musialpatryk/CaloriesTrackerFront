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

  // TODO: getProducts, getProductsChanged
}
