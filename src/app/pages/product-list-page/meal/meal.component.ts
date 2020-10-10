import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../../models/product.model';
import { MealsService } from '../../../services/meals.service';
 
@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit, OnDestroy {
  @Input() mealIndex: number;
  @Input() mealCalories: number;
  productsAsObservable: Subscription;
  products: Product[];

  constructor( private mealService: MealsService) { }

  ngOnInit(): void {
    this.products = this.mealService.getMeals()[this.mealIndex].products;
    this.productsAsObservable = this.mealService.getMealsChanged()
      .subscribe(
        newMeals => {
          this.products = newMeals[this.mealIndex].products;
        }
      );
   }

  ngOnDestroy(): void {
     this.productsAsObservable.unsubscribe();
  }

  handleAddProduct(){
    this.mealService.addNewProduct(this.mealIndex);
  }

  handleDeleteProduct(productIndex){
    this.mealService.deleteProduct(this.mealIndex,productIndex);
  }

  handleProductNameChange(value, productIndex){
    this.mealService.changeProductName(value, this.mealIndex, productIndex);
  }

  handleProductGramsChange(value, productIndex) {
    this.mealService.changeProductGrams(value, this.mealIndex, productIndex);
  }

}
