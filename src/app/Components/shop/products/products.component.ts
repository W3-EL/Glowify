import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { product } from 'src/app/Models/product.model';
import { SharedService } from 'src/app/Services/shared.service';
import Swal from 'sweetalert2';

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
  filterByCategory: product[] = [];
  filterByBrand: product[] = [];
  selectedProduct!: product;
  selectedProducts: product[] = [];
  private subscription: Subscription | undefined;
  @Input() product: any;

  
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
      this.filterProductsByBrand();
    }

    this.subscription = this.shared.selectedProducts$.subscribe((products: product[]) => {
      if (products.length === 0) {
        // Navigate to collection page if selectedProducts becomes empty
        this.router.navigate(['/shop']);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

    this.shared.clearSelectedProducts();
  }

  increaseNumber() {
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
      this.filterByCategory = this.shared.products
        .filter(product => 
          product.category.name === this.selectedProduct.category.name && 
          product._id !== this.selectedProduct._id &&
          product.stock !== 0
        )
        .slice(0, 4);
    }
  }
  filterProductsByBrand(): void {
    if (this.selectedProduct) {
      this.filterByBrand = this.shared.products
        .filter(product => 
          product.brand.name === this.selectedProduct.brand.name && 
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
    this.filterProductsByBrand(); // Update the filtered products
  }

  onProductClick(product: product): void {
    this.updateSelectedProductView(product);
  }
  isNewProduct(createdAt: Date | undefined): boolean {
    if (!createdAt) {
      return false; // Return false if createdAt is undefined
    }
    const today = new Date();
    const productDate = new Date(createdAt);
    return productDate.toDateString() === today.toDateString();
  }

  addToCart(productid:string | undefined): void {
    if (productid) {
    this.shared.addProductToCart(productid, this.number).subscribe(
      (response) => {
        console.log('Product added to cart:', response);
        Swal.fire({
          title: "PRODUCT ADDED TO YOUR CART",
          width: 600,
          background: "#eec2c9",
          color: "black",
          showConfirmButton: false,
          timer: 1000
        });
        this.router.navigate(['/cart']);
      },
      (error) => {
        this.router.navigate(['/login']);
        console.error('Error adding product to cart:', error);
      }
    );
  }
}
}
