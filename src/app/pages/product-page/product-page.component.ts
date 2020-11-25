import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {
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
    this.productService.addNewProduct(this.addProductForm.value.productName, this.addProductForm.value.productKcal);
    return true;
  }
}
