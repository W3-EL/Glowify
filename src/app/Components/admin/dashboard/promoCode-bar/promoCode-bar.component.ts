import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PromoCode } from 'src/app/Models/promoCode.model';
import { SharedService } from 'src/app/Services/shared.service';
// import { categories } from 'src/app/Models/categories.model';
import Swal from 'sweetalert2';

@Component({
  selector: '.promoCode-bar',
  templateUrl: './promoCode-bar.component.html',
  styleUrls: ['./promoCode-bar.component.css']
})
export class PromoCodeBarComponent implements OnInit {
  showAddLine: boolean = false;
  categoriesIdToUpdate: any;

  constructor(public shared : SharedService) { }

  promoCodeForm: PromoCode = {
    codePromo: '',
    discountAmount: 0,
    expirationDate: ''
  };
  
  ngOnInit(): void {
    this.getAllPromoCode();
    
  }

  getAllPromoCode() :void{
    this.shared.getPromoCode().subscribe(
      response => {
        if (response.success) {
          this.shared.PromoCode = response.data;
        } else {
          console.error('Failed to fetch Promo Code:', response);
        }
      },
      error => {
        console.error('Error fetching Promo Code:', error);
      }
    );  
  }
  toggleAddLine(): void {
    this.showAddLine = !this.showAddLine;
  }
  addPromoCode():void {
    const dateSendingToServer = new DatePipe('en-US').transform(this.promoCodeForm.expirationDate, 'yyyy/MM/dd');
    if(dateSendingToServer){
      this.promoCodeForm.expirationDate=dateSendingToServer
      this.shared.addPromoCode(this.promoCodeForm).subscribe(
        (response) => {
          console.log('Added new Promo Code:', response);
          Swal.fire({
            icon: "success",
            title: "Promo Code added successfully",
            width: 300,
            background: "transparent",
            padding: "10em 1em 1em 1em ",
            color: "#d39715",
            backdrop: `
            rgba(0,0,0,0.7)
            url("../../../../../assets/alert/alert.png")
            center
            no-repeat
          `,
            showConfirmButton: false,
            timer: 2000
          });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
  
        },
        (error) => {
          console.error('Error adding Promo Code:', error);
          Swal.fire({
            title: "ERROR adding Promo Code",
            width: 300,
            text: 'You are missing something to add',
            padding: "10em 1em 1em 1em ",
            color: "#d39715",
            background: "transparent",
            backdrop: `
            rgba(0,0,0,0.7)
            url("../../../../../assets/alert/alert.png")
            center
            no-repeat
          `,
            confirmButtonColor:"#d39715"
            }); 
    
        }
      );}
    }
    deletPromoCode(codeId: string | undefined): void {
      if(codeId){
      this.shared.deletPromoCode(codeId).subscribe(
        response => {
          Swal.fire({
            icon: "success",
            title: "Promo Code Deleted successfully",
            width: 300,
            background: "transparent",
            padding: "10em 1em 1em 1em ",
            color: "#d39715",
            backdrop: `
            rgba(0,0,0,0.7)
            url("../../../../../assets/alert/alert.png")
            center
            no-repeat
          `,
            showConfirmButton: false,
            timer: 3000
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
          // this.contacts = this.contacts.filter(contact => contact._id !== contactId);
        },
        error => {
          Swal.fire({
            title: "ERROR deleting Promo Code",
            width: 300,
            text: error.error.message,
            padding: "10em 1em 1em 1em ",
            color: "#d39715",
            background: "transparent",
            backdrop: `
            rgba(0,0,0,0.7)
            url("../../../../../assets/alert/alert.png")
            center
            no-repeat
          `,
    
            confirmButtonColor:"#876445"
          });        
  
          console.error('Error deleting Promo Code:', error);
        }
      );}
    }
  
}



