import { Component, OnInit } from '@angular/core';
import { product } from 'src/app/Models/product.model';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  constructor(public shared : SharedService) { }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.shared.getAllProducts().subscribe(
      (response) => {
        if (response.success) {
          this.shared.products = response.data;
        } else {
          console.error('Error');
        }
      },
      (error) => {
        console.error('HTTP Error:', error);
      }
    );
  }
}
