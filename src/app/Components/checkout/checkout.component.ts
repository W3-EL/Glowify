import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Services/shared.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/Services/auth.service';
import { PaymentService } from 'src/app/Services/payment.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  totalorder=this.shared.totalorder;
  userHasAddress=false;
  totalPrice = 0;
  constructor(private paymentService: PaymentService, public shared: SharedService, public auth: AuthService,private router: Router) { 

    this.totalPrice;
  }

  ngOnInit(): void {
    this.shared.totalPrice$.subscribe(price => {
      this.totalPrice = price;
    });
    this.calculateTotal()
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
            this.router.navigate(["/track"])
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
      const priceInMillimes = this.totalorder * 1000;
      this.shared.setTotalPrice(this.totalorder);
      this.makePayment(priceInMillimes);
    }
    
    
    else {
      console.error('error')
    }
  }
  makePayment(amount: number): void {
    this.paymentService.makePayment(amount)
      .subscribe(
        (response) => {
          
          console.log('Payment response:', response);
          window.location.href = response.result.link;
        },
        (error) => {
          console.error('Error making payment:', error);
        }
      );
  }
  verifyPayment(paymentId: string): void {
    this.paymentService.verifyPayment(paymentId)
      .subscribe(
        (response) => {
          console.log('Payment verification response:', response);
        },
        (error) => {
          console.error('Error verifying payment:', error);
        }
      );
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
