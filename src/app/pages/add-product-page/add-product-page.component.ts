import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-add-product-page',
  templateUrl: './add-product-page.component.html',
  styleUrls: ['./add-product-page.component.css']
})
export class AddProductPageComponent implements OnInit {
  addProductForm: FormGroup;
  isMessageVisible = false;
  message: string;

  constructor( private productService: ProductsService , private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addProductForm = this.fb.group(
      {
        productName: ['', Validators.required ],
        productKcal: ['', Validators.required ]
      }
    );
  }

  submitNewProduct(){
    this.isMessageVisible = true;
    if(this.productService.checkIfProductExists(this.addProductForm.value.productName)) {
      this.message = 'Produkt już istnieje!';
      this.addProductForm.reset();
      return false;
    }
    this.productService.addNewProduct(this.addProductForm.value.productName, this.addProductForm.value.productKcal);
    this.message = 'Dodano produkt!';
    return true;
  }
}
