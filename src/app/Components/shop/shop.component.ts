import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Brand } from 'src/app/Models/brand.model';
import { Category } from 'src/app/Models/category.model';
import { product } from 'src/app/Models/product.model';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  constructor(public shared : SharedService, private router: Router) { }
  ngOnInit(): void {
  
    this.getAllProducts();
    this.getAllCategory();
    this.getAllBrand(); 
  }

  getAllProducts(): void {
    this.shared.getAllProduct().subscribe(
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



  getAllCategory(): void {
    this.shared.getAllCategory().subscribe(
      (response) => {
        if (response.success) {
          const categoryNames = response.data.map(category => category.name);
          const uniquecategory = this.getUniqueCategory(categoryNames);
          this.shared.Category = uniquecategory;
        } else {
          console.error('Error');
        }
      },
      (error) => {
        console.error('HTTP Error:', error);
      }
    );
  }
  
  getUniqueCategory(categoryNames: string[]): Category[] {
    const uniqueCatNamesSet = new Set(categoryNames);
    const uniquecategory: Category[] = Array.from(uniqueCatNamesSet).map(name => ({ name }));
    return uniquecategory;
  }
  getAllBrand(): void {
    this.shared.getAllBrand().subscribe(
      (response) => {
        if (response.success) {
          const brandNames = response.data.map(brand => brand.name);
          const uniqueBrands = this.getUniqueBrands(brandNames);
          this.shared.Brands = uniqueBrands;
        } else {
          console.error('Error');
        }
      },
      (error) => {
        console.error('HTTP Error:', error);
      }
    );
  }
  
  getUniqueBrands(brandNames: string[]): Brand[] {
    const uniqueBrandNamesSet = new Set(brandNames);
    const uniqueBrands: Brand[] = Array.from(uniqueBrandNamesSet).map(name => ({ name }));
    return uniqueBrands;
  }


}
