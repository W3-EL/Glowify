import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: '.general-bar',
  templateUrl: './general-bar.component.html',
  styleUrls: ['./general-bar.component.css']
})
export class GeneralBarComponent implements OnInit {

  constructor(public shared : SharedService) { }
  countCategories = 0;
  countproducts = 0;
  countCustomers = 0;
  countorders = 0;
  countContacts= 0;
  ngOnInit(): void {
    this.countcategories();
    this.countproduct();
    this.countCustomer();
    this.countorder();
    this.countContact();
  }
  countcategories(){
    // this.shared.countCategories().subscribe(
    //   (data: number) => {
    //     this.countCategories=data;
  
    //     console.log(data);
    //   },
    //   (error: any) => {
    //     // Handle errors here
    //     console.error('Error:', error);
    //   }
    // );
    }
    countproduct(){
      // this.shared.countproduct().subscribe(
      //   (data: number) => {
      //     this.countproducts=data;
    
      //     console.log(data);
      //   },
      //   (error: any) => {
      //     // Handle errors here
      //     console.error('Error:', error);
      //   }
      // );
      }
      countCustomer(){
        // this.shared.countCustomer().subscribe(
        //   (data: number) => {
        //     this.countCustomers=data;
      
        //     console.log(data);
        //   },
        //   (error: any) => {
        //     // Handle errors here
        //     console.error('Error:', error);
        //   }
        // );
        }
      countContact(){
        // this.shared.countContact().subscribe(
        //   (data: number) => {
        //     this.countContacts=data;
        
        //     console.log(data);
        //   },
        //   (error: any) => {
        //     // Handle errors here
        //     console.error('Error:', error);
        //   }
        // );
      }
        countorder(){
          // this.shared.countorder().subscribe(
          //   (data: number) => {
          //     this.countorders=data;
        
          //     console.log(data);
          //   },
          //   (error: any) => {
          //     // Handle errors here
          //     console.error('Error:', error);
          //   }
          // );
          }
            



  }
