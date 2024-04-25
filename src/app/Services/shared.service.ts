import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { user } from '../Models/user.model';
import { product } from '../Models/product.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  baseApiUrl : string = environment.baseApiUrl;
  products: product[] = [];

  constructor(private http: HttpClient) { }

  signUpUser(user: user) : Observable<user>  {
    return this.http.post<user>(this.baseApiUrl +`user/signup`, user);
  }

  // getAllProducts() : Observable<product[]>  {
  //   return this.http.get<product[]>(this.baseApiUrl +`product/`);
  // }

  getAllProducts(): Observable<{ success: boolean, data: product[] }> {
    return this.http.get<{ success: boolean, data: product[] }>(this.baseApiUrl +`product/`);
  }


}
