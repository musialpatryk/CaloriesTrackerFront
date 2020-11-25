import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AvailableProduct } from 'src/app/models/available-products.model';
import { Product } from '../models/product.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products: AvailableProduct[];
  private emitProducts = new Subject<string[]>();

  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.products = [];
    this.http.get('/api/products/', { headers: this.auth.getAuthHeaders() })
      .subscribe(
        (products: AvailableProduct[]) => {
          this.products = products;
        }
      );
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

  getProductsChanged(): Observable<string[]>{
    return this.emitProducts.asObservable();
  }

  addNewProduct(name, kcal){
    const newProduct = { name, kcal };
    this.http.post('/api/products/', newProduct , { headers: this.auth.getAuthHeaders() })
    .subscribe(
      ()=>{
        this.getProducts();
      },
      () => {
        console.log("Wystąpił błąd, dane mogą pozostać niezapisane.");
      }
    );
  }

  getProducts(){
    this.http.get('/api/products/', { headers: this.auth.getAuthHeaders() })
      .subscribe(
        (products: AvailableProduct[]) => {
          this.products = products;
        },
        () => {
          console.log("Brak połączenia z bazą danych, zmiany mogę pozostać niezapisane.");
        }
      );
  }
}
