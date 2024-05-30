import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/Services/shared.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  totalorder = 0 ;
  constructor(
    private route: ActivatedRoute,
    private shared: SharedService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.shared.totalPrice$.subscribe(price => {
      this.totalorder = price;
    });
    this.confirmOrder(this.totalorder);
  }

  confirmOrder(totalorder: number) {
    this.shared.createOrder(totalorder,true).subscribe(
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
          this.router.navigate(["/track"]);
        }, 1000);
      },
      error => {
        console.error('Error creating order:', error);
        this.router.navigate(["/cart"]);
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

  // verifyPayment(paymentId: string): void {
  //   this.paymentService.verifyPayment(paymentId)
  //     .subscribe(
  //       (response) => {
  //         console.log('Payment verification response:', response);
  //       },
  //       (error) => {
  //         console.error('Error verifying payment:', error);
  //       }
  //     );
  // }
}
