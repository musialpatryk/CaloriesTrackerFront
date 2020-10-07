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
  mealsAsObservable: Subscription;

  constructor(private mealService: MealsService) { }

  ngOnInit(): void {
    this.meals = this.mealService.getMeals();
    this.mealsAsObservable = this.mealService.getMealsChanged()
      .subscribe(
        newMeals => {
          this.meals = newMeals;
        }
      );
   }

   ngOnDestroy(): void {
     this.mealsAsObservable.unsubscribe();
   }

   handleAddProduct(){
     this.mealService.addNewMeal();
   }

}
