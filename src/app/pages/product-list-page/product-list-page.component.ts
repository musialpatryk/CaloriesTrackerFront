import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Meal } from '../../models/meal.model';
import { MealsService } from '../../services/meals.service';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.css']
})
export class ProductListPageComponent implements OnInit,OnDestroy {
  meals: Meal[];
  daySum: number;
  mealsAsObservable: Subscription;
  daySumAsObservable: Subscription;

  constructor(private mealService: MealsService) { }

  ngOnInit(): void {
    this.meals = this.mealService.getMeals();
    this.mealsAsObservable = this.mealService.getMealsChanged()
      .subscribe(
        newMeals => {
          this.meals = newMeals;
        }
      );
    this.daySum = this.mealService.getDaySum();
    this.daySumAsObservable = this.mealService.getDaySumChanged()
      .subscribe(
         newSum => {
          this.daySum = newSum;
         }
      );

   }

   ngOnDestroy(): void {
     this.mealsAsObservable.unsubscribe();
     this.daySumAsObservable.unsubscribe();
   }

   handleAddProduct(){
     this.mealService.addNewMeal();
   }

}
