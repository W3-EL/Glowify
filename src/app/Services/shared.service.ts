import { EventEmitter, Injectable } from '@angular/core';
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
  selectedCategories: string[] = [];
  selectedBrand: string[] = [];
  selectedGenders: string[] = [];
  baseApiUrl : string = environment.baseApiUrl;
  products: product[] = [];
  user:user[]=[];
  Contact:Contact[]=[];
  Category:Category[]=[];
  Brands:Brand[]=[];
  selectedProducts: product[] = [];
  img = "";

  private selectedProductsSubject: BehaviorSubject<product[]> = new BehaviorSubject<product[]>(this.selectedProducts);
  selectedProducts$: Observable<product[]> = this.selectedProductsSubject.asObservable();

  constructor(private http: HttpClient) { }
  private getToken(): string {
    return localStorage.getItem('token') || '';
  }

  login(email: string, password: string): Observable<{ user: user, token: string }> {
    return this.http.post<{ user: user, token: string }>(this.baseApiUrl +`user/login`, { email, password });
  }
  signUpUser(user: user) : Observable<user>  {
    return this.http.post<user>(this.baseApiUrl +`user/signup`, user);
  }

  getAllProduct(): Observable<{ success: boolean, data: product[] }> {
    return this.http.get<{ success: boolean, data: product[] }>(this.baseApiUrl +`product/`);
  }
  
  addProduct(product:product) : Observable<product> {
    const token = this.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<product>(this.baseApiUrl +`product/`,product, { headers });  
  }
  deleteProduct(productId: string): Observable<product[]> {
    const token = this.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<product[]>(this.baseApiUrl +`product/${productId}`, { headers });
  }
  getProductCount(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl +`product/count/p`);
  }
  getUserCount(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl +`user/count/u`);
  }
  getContactCount(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl +`contact/count/c`);
  }
  getAllUser() : Observable<user[]> {
    return this.http.get<user[]>(this.baseApiUrl + 'user/');
  }

  deleteUser(userId: string): Observable<user[]> {
    const token = this.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.delete<user[]>(this.baseApiUrl +`user/${userId}`, { headers });
  }

  addContact(contact:Contact) : Observable<Contact> {
    return this.http.post<Contact>(this.baseApiUrl +`contact/`,contact);  
  }

  getAllContact(): Observable<{ success: boolean, data: Contact[] }> {
    return this.http.get<{ success: boolean, data: Contact[] }>(this.baseApiUrl +`contact/`);
  }

  deleteContact(contactId: string): Observable<Contact[]> {
    const token = this.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<Contact[]>(this.baseApiUrl +`contact/${contactId}`, { headers });
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
  }


}
