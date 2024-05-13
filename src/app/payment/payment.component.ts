import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../Services/payment.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  constructor(private paymentService: PaymentService, private router: Router) { }

  ngOnInit(): void {
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
          // Handle the error
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
}
