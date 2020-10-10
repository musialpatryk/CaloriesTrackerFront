import { Injectable } from '@angular/core';
import { AvailableProduct } from 'src/app/models/available-products.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: AvailableProduct[];

  constructor() {
    this.products = [
      {
        name: 'Kurczak',
        kcal: 100
      },
      {
        name: 'Kanapka',
        kcal: 200
      }
    ];
  }

  getProductCalories( productName ): number{
    if(productName == null || productName === '') return 0;
    const productKcal = this.products.find( product => product.name === productName).kcal;
    if( productKcal == null) return 0;
    return productKcal;
  }

  getProductsNames(): string[]{
    return this.products.map( product => {
      return product.name;
    });
  }
}
