import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import { CountUp } from 'countup.js';
@Component({
  selector: '.general-bar',
  templateUrl: './general-bar.component.html',
  styleUrls: ['./general-bar.component.css']
})
export class GeneralBarComponent implements OnInit {

  constructor(public shared : SharedService) { }
  countpromocodes = 0;
  countcategories = 0;
  countbrands = 0;
  countproducts = 0;
  countCustomers = 0;
  countorders = 0;
  countContacts= 0;
  ngOnInit(): void {
    this.fetchCounts();

  }
  animateCount(id: string, endValue: number): void {
    const countUp = new CountUp(id, endValue);
    if (!countUp.error) {
      countUp.start();
    } else {
      console.error(countUp.error);
    }
  }
  fetchCounts(): void {
    this.shared.getProductCount().subscribe(
      response => {
        this.animateCount('productCount', response.data);

      },
      error => {
      }
    );

    this.shared.getUserCount().subscribe(
      response => {
        this.animateCount('userCount', response.count);
      },
      error => {
      }
    );

    this.shared.getContactCount().subscribe(
      response => {
        this.animateCount('contactCount', response.count);
      },
      error => {
      }
    );

    this.shared.getpromoCode().subscribe(
      response => {
        this.animateCount('promoCodeCount', response.count);
      },
      error => {
      }
    );

    this.shared.getOrderCount().subscribe(
      response => {
        this.animateCount('orderCount', response.count);
      },
      error => {
      }
    );

    this.shared.getCategoryCount().subscribe(
      response => {
        this.animateCount('categoryCount', response.data);
      },
      error => {
      }
    );
    
    this.shared.getBrandCount().subscribe(
      response => {
        this.animateCount('brandCount', response.data);
      },
      error => {
      }
    );
  }
}


