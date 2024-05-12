import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { product } from 'src/app/Models/product.model';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit,OnDestroy  {

  constructor(public shared : SharedService, private router: Router) { }
  number: number = 1;
  price: number = 25;
  img="";
  selectedProducts: product[] = [];
  private subscription: Subscription | undefined;
  ngOnInit(): void {
    this.selectedProducts = this.shared.selectedProducts;
    if (!this.selectedProducts || this.selectedProducts.length === 0) {
      this.router.navigate(['/shop']);
    } else {
      // Assuming there's only one selected product for simplicity
      const selectedProduct = this.selectedProducts[0];
      if (selectedProduct) {
        this.price = selectedProduct.price;
        this.img = "../../../../assets/product/"+selectedProduct.img+".jpg";
      }
    }
    this.subscription = this.shared.selectedProducts$.subscribe((products: product[]) => {
      if (products.length === 0) {
        // Navigate to collection page if selectedProducts becomes empty
        this.router.navigate(['/shop']);
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from the subscription to prevent memory leaks
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    // Clear the selectedProducts list
    this.shared.clearSelectedProducts();
  }
  increaseNumber() {
    // Find the minimum between the current number and the stock of the selected product
    const maxNumber = Math.min(this.number + 1, this.selectedProducts[0].stock);
    if (this.number < maxNumber) {
      this.number++;
    }
  }

  decreaseNumber() {
    if (this.number > 1) {
      this.number--;
    }
  }

  calculateTotalPrice(): number {
    return this.number * this.price;
  }
}
