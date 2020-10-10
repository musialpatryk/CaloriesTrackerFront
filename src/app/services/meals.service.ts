import { Injectable } from '@angular/core';
import { Meal } from '../models/meal.model';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  private meals: Meal[];
  private daySum: number;
  private emitMeals = new Subject<Meal[]>();
  private emitDaySum = new Subject<number>();

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
        ],
        caloriesSummary: 200
      }
    ];
    this.calculateCaloriesSum();
  }

  calculateMealCalories(mealIndex){
    var summary = 0;
    this.meals[mealIndex].products.forEach(element => {
      if (element.grams == null) return;
      summary += Number(element.grams);
    });
    this.meals[mealIndex].caloriesSummary = summary;
    this.calculateCaloriesSum();
  }

  calculateCaloriesSum(){
    var summary = 0;
    this.meals.forEach(element => {
      if (element.caloriesSummary == null) return;
      summary += Number(element.caloriesSummary);
    });
    this.daySum = summary;
    this.emitDaySum.next(this.daySum);
  }

  getDaySum(){
    return this.daySum;
  }

  getDaySumChanged(): Observable<number>{
    return this.emitDaySum.asObservable();
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

      ],
      caloriesSummary: 0
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
    this.calculateMealCalories(index);
    this.emitMeals.next([...this.meals]);
  }

  deleteProduct(mealIndex, productIndex){
    this.meals[mealIndex].products.splice(productIndex , 1);
    this.calculateMealCalories(mealIndex);
    this.emitMeals.next([...this.meals]);
  }

  changeProductName(newValue, mealIndex, productIndex) {
    this.meals[mealIndex].products[productIndex].name = newValue;
    this.emitMeals.next([...this.meals]);
  }

  changeProductGrams(newValue, mealIndex, productIndex) {
    this.meals[mealIndex].products[productIndex].grams = newValue;
    this.calculateMealCalories(mealIndex);
    this.emitMeals.next([...this.meals]);
  }

  // TODO: To decide: getProducts, getProductsChanged or update products -> without subscription. 
}
