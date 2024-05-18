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
export class ProductsComponent implements OnInit, OnDestroy {

  number: number = 1;
  price: number = 25;
  img = "";
  imgBaseUrl: string = "../../../../assets/product/";
  filteredProducts: product[] = [];
  selectedProduct!: product;
  selectedProducts: product[] = [];
  private subscription: Subscription | undefined;

  constructor(public shared: SharedService, private router: Router) { }

  ngOnInit(): void {
    this.selectedProducts = this.shared.selectedProducts;
    if (!this.selectedProducts || this.selectedProducts.length === 0) {
      this.router.navigate(['/shop']);
    } else {
      // Assuming there's only one selected product for simplicity
      this.selectedProduct = this.selectedProducts[0];
      this.price = this.selectedProduct.price;
      this.img = `${this.imgBaseUrl}${this.selectedProduct.img}`;
      this.filterProductsByCategory();
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
    // Ensure the number does not exceed stock
    if (this.number < this.selectedProduct.stock) {
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

  back() {
    this.router.navigate(['/shop']);
  }

  getProductImgPath(product: product): string {
    return `${this.imgBaseUrl}${product.img}`;
  }

  filterProductsByCategory(): void {
    if (this.selectedProduct) {
      this.filteredProducts = this.shared.products
        .filter(product => 
          product.category.name === this.selectedProduct.category.name && 
          product._id !== this.selectedProduct._id &&
          product.stock !== 0
        )
        .slice(0, 4);
    }
  }
  updateSelectedProductView(product: product): void {
    this.selectedProduct = product;
    this.price = product.price;
    this.img = `${this.imgBaseUrl}${product.img}`;
    this.number = 1; // Reset quantity
    this.filterProductsByCategory(); // Update the filtered products
  }

  onProductClick(product: product): void {
    this.updateSelectedProductView(product);
  }
}
