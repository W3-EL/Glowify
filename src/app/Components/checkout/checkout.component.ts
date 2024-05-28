import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Services/shared.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalorder=this.shared.totalorder;
  userHasAddress=false;
  totalPrice = 0;
  constructor( public shared: SharedService, public auth: AuthService,private router: Router) { 

    this.totalPrice;
  }

  ngOnInit(): void {
    this.shared.totalPrice$.subscribe(price => {
      this.totalPrice = price;
    });
    this.calculateTotal()
    console.log(this.shared.deliveryPay);
    this.getAddress();  
  }

  orderBtn():boolean{
    if(this.userHasAddress==true && (this.shared.deliveryPay==true || this.shared.onlinePay==true)){
      return true
    }
    return false
  }

  calculateTotal() {
    this.totalorder=this.totalPrice+8;
  }

  confirmOrder(): void {
    if (this.userHasAddress==true && this.shared.deliveryPay==true && this.shared.onlinePay==false) {
      this.shared.createOrder(this.totalorder).subscribe(
        response => {
          console.log('Order created successfully:', response);
          Swal.fire({
            title: "ORDER CREATED SUCCESSFULLY",
            width: 600,
            background: "#eec2c9",
            color: "black",
            showConfirmButton: false,
            timer: 1000
          });
          this.shared.resetTotalPrice();
          setTimeout(() => {
            this.router.navigate(["/cart"])
          }, 1000);

        },
        error => {
          console.error('Error creating order:', error);
          Swal.fire({
            icon: 'error',
            title: 'ORDER NOT CREATED',
            text: error.error.message || 'Please try again.',
            background: '#efafb9',
            showConfirmButton: true,
            confirmButtonColor: "black"
          });
        }
      );
    }
    
    
    else if (this.userHasAddress==true && this.shared.deliveryPay==false && this.shared.onlinePay==true) {
      this.router.navigate(['/payment']);
      this.shared.setTotalPrice(this.totalorder);
    }
    
    
    else {
      console.error('error')
    }
  }
  getAddress(): void {
    const userId = this.auth.getUserID();
    if (userId) {
    this.shared.getSpecificAddress(userId)
      .subscribe(
        (response) => {
          this.userHasAddress = true;
        },
        (error) => {
          this.userHasAddress = false;
        }
      );
    }
  }

}
