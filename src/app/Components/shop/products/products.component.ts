import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  constructor() { }
  number: number = 1; // Default number
  price: number = 25; // Example original price

  ngOnInit(): void {
    
  }
  increaseNumber() {
    if (this.number < 9) {
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
