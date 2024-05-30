import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: '.general-bar',
  templateUrl: './general-bar.component.html',
  styleUrls: ['./general-bar.component.css']
})
export class GeneralBarComponent implements OnInit {

  constructor(public shared : SharedService) { }
  countpromocodes = 0;
  countproducts = 0;
  countCustomers = 0;
  countorders = 0;
  countContacts= 0;
  ngOnInit(): void {
    this.fetchCounts();

  }

  fetchCounts(): void {
    this.shared.getProductCount().subscribe(
      response => {
        this.countproducts = response.data;
      },
      error => {
        console.error('Error fetching product count:', error);
      }
    );

    this.shared.getUserCount().subscribe(
      response => {
        this.countCustomers = response.count;
      },
      error => {
        console.error('Error fetching user count:', error);
      }
    );

    this.shared.getContactCount().subscribe(
      response => {
        this.countContacts = response.count;
      },
      error => {
        console.error('Error fetching contact count:', error);
      }
    );

    this.shared.getpromoCode().subscribe(
      response => {
        this.countpromocodes = response.count;
      },
      error => {
        console.error('Error fetching contact count:', error);
      }
    );

    this.shared.getOrderCount().subscribe(
      response => {
        this.countorders = response.count;
      },
      error => {
        console.error('Error fetching contact count:', error);
      }
    );
  }
}


