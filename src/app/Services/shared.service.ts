import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { user } from '../Models/user.model';
import { product } from '../Models/product.model';
import { Contact } from '../Models/contact.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  baseApiUrl : string = environment.baseApiUrl;
  products: product[] = [];
  user:user[]=[];
  Contact:Contact[]=[];


  constructor(private http: HttpClient) { }
  loginUser(email: string, password: string): Observable<{ user: user, token: string }> {
    return this.http.post<{ user: user, token: string }>(this.baseApiUrl +`user/login`, { email, password });
  }

  signUpUser(user: user) : Observable<user>  {
    return this.http.post<user>(this.baseApiUrl +`user/signup`, user);
  }

  // getAllProducts() : Observable<product[]>  {
  //   return this.http.get<product[]>(this.baseApiUrl +`product/`);
  // }


  getAllProducts(): Observable<{ success: boolean, data: product[] }> {
    return this.http.get<{ success: boolean, data: product[] }>(this.baseApiUrl +`product/`);
  }

  getAllUser() : Observable<user[]> {
    return this.http.get<user[]>(this.baseApiUrl + 'user/');
  }
  deleteUser(userId:number):Observable<user[]>{
    const url = this.baseApiUrl + `user/${userId}`;
    return this.http.delete<user[]>(url);  
  }

  addContact(contact:Contact) : Observable<Contact> {
    return this.http.post<Contact>(this.baseApiUrl +`contact/`,contact);  
  }

}
