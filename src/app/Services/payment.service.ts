import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  baseApiUrl : string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }
  
  makePayment(amount: number): Observable<any> {
    const url = this.baseApiUrl +'payment/'; 
    const payload = {
      amount: amount
    };
    return this.http.post(url, payload);
  }
  verifyPayment(paymentId: string): Observable<any> {
    const url = this.baseApiUrl +`payment/${paymentId}`; 
    return this.http.get(url);
  }
}
