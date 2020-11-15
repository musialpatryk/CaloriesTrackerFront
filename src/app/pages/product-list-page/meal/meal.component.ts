import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from '../../../models/product.model';
import { MealsService } from '../../../services/meals.service';
import { ProductsService } from 'src/app/services/products.service';
import { AvailableProduct } from 'src/app/models/available-products.model';
 
@Component({
  selector: 'app-meal',
  templateUrl: './meal.component.html',
  styleUrls: ['./meal.component.css']
})
export class MealComponent implements OnInit, OnDestroy {
  @Input() mealIndex: number;
  @Input() mealCalories: number;
  productSelectAsObservable: Subscription;
  products: Product[];
  productsInSelect: string[];

  constructor( private mealService: MealsService, private productService: ProductsService) { }

  ngOnInit(): void {
    this.products = this.mealService.getMeals()[this.mealIndex].products;
    this.productsInSelect = this.productService.getProductsNames();
    this.productSelectAsObservable = this.productService.getProductsChanged()
      .subscribe(
        products => {
          this.productsInSelect = products;
        }
      )
   }

   ngOnDestroy(): void {
     this.productSelectAsObservable.unsubscribe();
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

  handleDeleteMeal(mealIndex){
    this.mealService.deleteMeal(mealIndex);
  }

  getSelectValues(omitName){
    return this.productsInSelect.filter(name => name !== omitName);
  }

}
