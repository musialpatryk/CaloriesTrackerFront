import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AvailableProduct } from 'src/app/models/available-product.model';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private products: AvailableProduct[];
  private emitProductsNames = new Subject<string[]>();
  private emitProducts = new Subject<AvailableProduct[]>();

  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.products = [];
    this.syncProducts();
  }

  getProductCalories(productName): number {
    if (productName == null || productName === '') return 0;
    const productKcal = this.products.find(
      (product) => product.name === productName
    ).kcal;
    if (productKcal == null) return 0;
    return productKcal;
  }

  getProductsNames(): string[] {
    return this.products.map((product) => product.name);
  }

  getProductsNamesChanged(): Observable<string[]> {
    return this.emitProductsNames.asObservable();
  }

  getProductsChanged(): Observable<AvailableProduct[]> {
    return this.emitProducts.asObservable();
  }

  addNewProduct(name, kcal) {
    const newProduct = { name, kcal };
    return this.http.post('/api/products/', newProduct, {
      headers: this.auth.getAuthHeaders(),
    });
  }

  syncProducts() {
    this.http
      .get('/api/products/', { headers: this.auth.getAuthHeaders() })
      .subscribe(
        (products: AvailableProduct[]) => {
          this.products = products;
          this.emitProducts.next([...this.products]);
        },
        () => {
          console.log(
            'Brak połączenia z bazą danych, zmiany mogę pozostać niezapisane.'
          );
        }
      );
  }

  getProducts(): AvailableProduct[] {
    return this.products;
  }

  deleteProduct(name: string) {
    this.http
      .delete(`/api/products/${name}`, { headers: this.auth.getAuthHeaders() })
      .subscribe(
        (products: AvailableProduct[]) => {
          this.products = products;
          this.emitProducts.next([...this.products]);
        },
        () => {
          console.log(
            'Brak połączenia z bazą danych, zmiany mogę pozostać niezapisane.'
          );
        }
      );
  }
}
