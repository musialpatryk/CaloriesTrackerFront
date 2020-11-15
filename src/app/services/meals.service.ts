import { Injectable } from '@angular/core';
import { Meal } from '../models/meal.model';
import { Observable, Subject } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';
import { HttpClient } from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class MealsService {
  private meals: Meal[];
  private daySum: number;
  private emitMeals = new Subject<Meal[]>();
  private emitDaySum = new Subject<number>();

  constructor( private productService: ProductsService, private http: HttpClient, private auth: AuthenticationService, private router: Router) { 
    this.meals = [
      {
        products: [],
        caloriesSummary: null
      }
    ];
    this.getMealsFromServer();
  }

  getMealsFromServer(){
    this.http.get('/api/days/meals/', { headers: this.auth.getAuthHeaders() })
      .subscribe( 
      (res: Meal[]) => {
        this.meals = res;
        this.emitMeals.next([...res]);
        this.checkCaloriesSum();
        this.calculateCaloriesSum();
      },
      (err) => {
        this.auth.logout();
        this.router.navigateByUrl('panel-logowania?message=1');
      }
    );
  }

  pushMealsToServer(meals){
    this.http.post('/api/days/meals/', meals , { headers: this.auth.getAuthHeaders() })
      .subscribe(
        ()=>{ },
        () => {
          console.log("Brak połączenia, dane mogą pozostać niezapisane.");
        }
      );
  }

  checkCaloriesSum(){
    this.meals.forEach( (meal, index) => {
      if(meal.caloriesSummary == null) this.calculateMealCalories(index);
    });
  }

  calculateMealCalories(mealIndex){
    var summary = 0;
    this.meals[mealIndex].products.forEach(element => {
      if (element.grams == null) return;

      const calories: number = this.productService.getProductCalories(element.name);
      summary += (Number(element.grams) / 100) * calories;
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
    this.pushMealsToServer([...this.meals]);
  }

  deleteMeal(mealIndex){
    this.meals.splice(mealIndex, 1);
    this.calculateCaloriesSum();
    this.emitMeals.next([...this.meals]);
    this.pushMealsToServer([...this.meals]);
  }

  addNewProduct(index: number){
    const newProduct = {
      name: '',
      grams: null
    }
    this.meals[index].products.push(newProduct);
    this.calculateMealCalories(index);
    this.emitMeals.next([...this.meals]);
    this.pushMealsToServer([...this.meals]);
  }

  deleteProduct(mealIndex, productIndex){
    this.meals[mealIndex].products.splice(productIndex , 1);
    this.calculateMealCalories(mealIndex);
    this.emitMeals.next([...this.meals]);
    this.pushMealsToServer([...this.meals]);
  }

  changeProductName(newValue, mealIndex, productIndex) {
    this.meals[mealIndex].products[productIndex].name = newValue;
    this.calculateMealCalories(mealIndex);
    this.emitMeals.next([...this.meals]);
    this.pushMealsToServer([...this.meals]);
  }

  changeProductGrams(newValue, mealIndex, productIndex) {
    this.meals[mealIndex].products[productIndex].grams = newValue;
    this.calculateMealCalories(mealIndex);
    this.emitMeals.next([...this.meals]);
    this.pushMealsToServer([...this.meals]);
  }
}
