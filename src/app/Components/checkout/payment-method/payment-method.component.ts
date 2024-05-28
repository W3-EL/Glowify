import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.css']
})
export class PaymentMethodComponent implements OnInit {

  constructor(public shared: SharedService) { }
  paymentMethod: string = '';
  ngOnInit(): void {
  }

  updateBtn() {
      this.shared.deliveryPay = false;
      this.shared.onlinePay = false;
  }

  confirmPaymentMethod(): void {
    if (this.paymentMethod === 'delivery') {
      this.shared.deliveryPay = true;
      this.shared.onlinePay = false;
    } else if (this.paymentMethod === 'online') {
      this.shared.deliveryPay = false;
      this.shared.onlinePay = true;
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'No Payment Method Selected',
        text: 'Please select a payment method before confirming.',
        background: '#efafb9',
        showConfirmButton: true,
        confirmButtonColor: 'black'
      });
      return;
    }

    Swal.fire({
      title: "Payment Method Confirmed",
      text: `You have selected ${this.paymentMethod} payment method.`,
      width: 600,
      background: "#eec2c9",
      color: "black",
      showConfirmButton: false,
      timer: 1000
    });
  }

}
