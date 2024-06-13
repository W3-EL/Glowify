import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/Services/shared.service';
import Swal from 'sweetalert2';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  totalorder = 0 ;
  address = '' ;
  constructor(
    private route: ActivatedRoute,
    private shared: SharedService,
    private router: Router, public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.shared.totalPrice$.subscribe(price => {
      this.totalorder = price;
    });
    this.shared.address$.subscribe(address => {
      this.address = address;
    });
    this.confirmOrder(this.totalorder,this.address);
  }

  confirmOrder(totalorder: number,address : string) {
    this.shared.createOrder(totalorder,true,address).subscribe(
      response => {
        this.sendOrderConfirmationEmail(response.data._id);

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
  sendOrderConfirmationEmail(orderId:string): void {
    const templateParams = {
      fullname: this.auth.getUserName(),
      email: this.auth.getUserMail(),
      orderId: orderId,
      totalAmount: this.totalorder,
      shippingAddress: this.address
    };

    emailjs.send('service_tl0mmi9', 'template_518lkok', templateParams, 'AD45IWJuv8I55skNp')
      .then((response: EmailJSResponseStatus) => {
        console.log('Order confirmation email sent successfully:', templateParams);
      })
      .catch((error) => {
        console.error('Error sending order confirmation email:', templateParams);
      });
  }

}
