import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;
  isMessageVisible = false;
  message: string;

  constructor(
    private productService: ProductsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.addProductForm = this.fb.group({
      productName: ['', Validators.required],
      productKcal: ['', Validators.required],
    });
  }

  submitNewProduct() {
    this.productService
      .addNewProduct(
        this.addProductForm.value.productName,
        this.addProductForm.value.productKcal
      )
      .subscribe(
        () => {
          this.productService.syncProducts();
          this.message = 'Dodano produkt!';
          this.isMessageVisible = true;
        },
        (err) => {
          if (err.status === 406)
            return (this.message = 'Produkt już istnieje!');
          this.message = 'Wystąpił błąd, dane mogą pozostać niezapisane.';
          this.isMessageVisible = true;
        }
      );
    this.addProductForm.reset();
  }
}
