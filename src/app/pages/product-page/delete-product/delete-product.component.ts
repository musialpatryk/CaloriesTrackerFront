import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AvailableProduct } from 'src/app/models/available-products.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-delete-product',
  templateUrl: './delete-product.component.html',
  styleUrls: ['./delete-product.component.css'],
})
export class DeleteProductComponent implements OnInit, OnDestroy {
  products: AvailableProduct[];
  productsAsObservable: Subscription;

  constructor(private productService: ProductsService) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
    this.productsAsObservable = this.productService
      .getProductsChanged()
      .subscribe((products: AvailableProduct[]) => {
        this.products = products;
      });
  }

  ngOnDestroy(): void {
    this.productsAsObservable.unsubscribe();
  }

  handleDeleteProduct(name) {
    this.productService.deleteProduct(name);
  }
}
