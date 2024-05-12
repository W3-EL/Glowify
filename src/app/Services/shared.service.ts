import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { user } from '../Models/user.model';
import { product } from '../Models/product.model';
import { Contact } from '../Models/contact.model';
import { Category } from '../Models/category.model';
import { Brand } from '../Models/brand.model';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  baseApiUrl : string = environment.baseApiUrl;
  products: product[] = [];
  user:user[]=[];
  Contact:Contact[]=[];
  Category:Category[]=[];
  Brands:Brand[]=[];
  token="";
  selectedProducts: product[] = [];
  img = "";

  private selectedProductsSubject: BehaviorSubject<product[]> = new BehaviorSubject<product[]>(this.selectedProducts);
  selectedProducts$: Observable<product[]> = this.selectedProductsSubject.asObservable();

  constructor(private http: HttpClient) { }
  loginUser(email: string, password: string): Observable<{ user: user, token: string }> {
    return this.http.post<{ user: user, token: string }>(this.baseApiUrl +`user/login`, { email, password });
  }

  signUpUser(user: user) : Observable<user>  {
    return this.http.post<user>(this.baseApiUrl +`user/signup`, user);
  }

  getAllProduct(): Observable<{ success: boolean, data: product[] }> {
    return this.http.get<{ success: boolean, data: product[] }>(this.baseApiUrl +`product/`);
  }
  addProduct(product:product) : Observable<product> {
    return this.http.post<product>(this.baseApiUrl +`product/`,product);  
  }

  getAllUser() : Observable<user[]> {
    return this.http.get<user[]>(this.baseApiUrl + 'user/');
  }
  deleteUser(userId:number):Observable<user[]>{
    const url = this.baseApiUrl + `user/${userId}`;
    const authToken = localStorage.getItem('authToken');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${authToken}`
    });
    return this.http.delete<user[]>(url, { headers });  
  }

  addContact(contact:Contact) : Observable<Contact> {
    return this.http.post<Contact>(this.baseApiUrl +`contact/`,contact);  
  }

  getAllContact(): Observable<{ success: boolean, data: Contact[] }> {
    return this.http.get<{ success: boolean, data: Contact[] }>(this.baseApiUrl +`contact/`);
  }

  
  getAllCategory(): Observable<{ success: boolean, data: Category[] }> {
    return this.http.get<{ success: boolean, data: Category[] }>(this.baseApiUrl +`category/`);
  }
  getAllBrand(): Observable<{ success: boolean, data: Brand[] }> {
    return this.http.get<{ success: boolean, data: Brand[] }>(this.baseApiUrl +`brand/`);
  }

  addProductDetails(product: product): void {
    this.selectedProducts.push(product);
    this.selectedProductsSubject.next(this.selectedProducts);
  }

  // Method to clear selectedProducts list
  clearSelectedProducts(): void {
    this.selectedProducts = [];
    this.selectedProductsSubject.next(this.selectedProducts);
  }}
