import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import {AuthService} from 'src/app/Services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public auth: AuthService,public shared: SharedService,private router: Router,public AuthService: AuthService) { }
  itemInCart: number=0;

  ngOnInit(): void {
    this.getCart()
    this.itemInCart
  }
  goToShopWithCat(cat:string): void {
    this.router.navigate(['/shop']);
    this.shared.selectedCategories.push(cat);
  }
  getCart(): void {
    const userId = this.auth.getUserID();
    if (userId) {
      this.shared.getCart(userId).subscribe(
        async (response: any) => {
          if (response.success) {
            const cart = response.data;
            this.itemInCart=cart.products.length;
          } else {
            console.error('Error fetching cart:', response);
          }
          },
          (error) => {
            console.error('Error fetching cart:', error);
          }
      );
    } else {
            console.error('User ID not found', userId);
    }
  }
}
