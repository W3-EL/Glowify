import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Services/shared.service';
import { product } from 'src/app/Models/product.model';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  imgBaseUrl: string = "../../../../assets/product/";
  constructor(public shared : SharedService, private router: Router) { }


  ngOnInit(): void {
    
  }
  sendProductDetails(product: product): void {
    // Add the selected product to the list in the service
    this.shared.addProductDetails(product);

    // Navigate to the product details component
    this.router.navigate(['/shop/products']);
  }
  getProductImgPath(product: product): string {
    return `${this.imgBaseUrl}${product.img}.jpg`;
  }
}
