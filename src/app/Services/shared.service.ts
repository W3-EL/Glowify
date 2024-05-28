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
import { Cart } from '../Models/cart.model';
import { PromoCode } from '../Models/promoCode.model';
import { Address } from '../Models/address.model';

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
  PromoCode:PromoCode[]=[];
  Category:Category[]=[];
  Brands:Brand[]=[];
  selectedProducts: product[] = [];
  img = "";
  totalorder=0;
  onlinePay = false;
  deliveryPay = false;
  private totalPriceKey = 'totalPrice';
  private totalPriceSource = new BehaviorSubject<number>(this.getTotalPriceFromLocalStorage());
  totalPrice$ = this.totalPriceSource.asObservable();
  private selectedProductsSubject: BehaviorSubject<product[]> = new BehaviorSubject<product[]>(this.selectedProducts);
  selectedProducts$: Observable<product[]> = this.selectedProductsSubject.asObservable();

  constructor(private http: HttpClient) {
    
   }
  private getToken(): string {
    return localStorage.getItem('token') || '';
    
  }


  resetTotalPrice() {
    this.setTotalPrice(0);
  }
  setTotalPrice(price: number) {
    this.totalPriceSource.next(price);
    localStorage.setItem(this.totalPriceKey, price.toString());
  }
  private getTotalPriceFromLocalStorage(): number {
    const storedPrice = localStorage.getItem(this.totalPriceKey);
    return storedPrice ? parseFloat(storedPrice) : 0;
  }

  login(email: string, password: string): Observable<{ user: user, token: string }> {
    return this.http.post<{ user: user, token: string }>(this.baseApiUrl +`user/login`, { email, password });
  }
  signUpUser(user: user) : Observable<user>  {
    return this.http.post<user>(this.baseApiUrl +`user/signup`, user);
  }
  updateUsersToAdmin(id: string, role: string): Observable<any> {
    const token = this.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(this.baseApiUrl +`user/${id}`, {role},{headers});
  }

  getAllProduct(): Observable<{ success: boolean, data: product[] }> {
    return this.http.get<{ success: boolean, data: product[] }>(this.baseApiUrl +`product/`);
  }
  getProductById(productId:string): Observable<{ success: boolean, data: product[] }> {
    return this.http.get<{ success: boolean, data: product[] }>(this.baseApiUrl +`product/${productId}`);
  }
  
  addProduct(product:product) : Observable<product> {
    const token = this.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<product>(this.baseApiUrl +`product/`,product, { headers });  
  }
  updateProduct(id: string, product: product): Observable<any> {
    const token = this.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(this.baseApiUrl +`product/${id}`, product,{headers});
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
  getpromoCode(): Observable<any> {
    return this.http.get<any>(this.baseApiUrl +`cart/count/pc`);
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
  getCart(userId: string): Observable<Cart> {
    return this.http.get<Cart>(this.baseApiUrl +`cart/user/${userId}`);
  }

  addProductToCart(productId: string, quantity: number) {
    const token = this.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.baseApiUrl +`cart/add`, { productId, quantity }, { headers });
  }

  removeFromCart(productId: string): Observable<any> {
    const token = this.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(this.baseApiUrl +`cart/remove`, { productId },{ headers });
  }
  clearCart(userId: string): Observable<any> {
    const token = this.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(this.baseApiUrl +`cart/clear/${userId}`, {},{ headers });
  }

  addPromoCode(promoCode : PromoCode):Observable<PromoCode> {
    const token = this.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<PromoCode>(this.baseApiUrl +`cart/promocode/add`, promoCode,{headers});
  }
  
  getPromoCode(): Observable<{ success: boolean, data: PromoCode[] }> {
    return this.http.get<{ success: boolean, data: PromoCode[] }>(this.baseApiUrl +`cart/promocode/`);
  }
  deletPromoCode(PromoCodeId: string): Observable<PromoCode[]> {
    const token = this.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete<PromoCode[]>(this.baseApiUrl +`cart/promocode/delete/${PromoCodeId}`, { headers });
  }

  validatePromoCode(codePromo: string): Observable<any> {
  return this.http.post<any>(this.baseApiUrl +`cart/promocode/validate`, { codePromo })
  }

  updatePromoCode(id: string, promoCode: PromoCode): Observable<any> {
    const token = this.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(this.baseApiUrl +`cart/promocode/${id}`, promoCode,{headers});
  }


  addAddress(address: Address) {
    const token = this.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.baseApiUrl +`address/`, address, { headers });
  }
  
  deleteAddress() {
    const token = this.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.delete(this.baseApiUrl +`address/`, { headers });
  }

  updateAddress(address: Address) {
    const token = this.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(this.baseApiUrl +`address/`,address, { headers });
  }

  getSpecificAddress(userId: string): Observable<any> {
    return this.http.get(this.baseApiUrl +`address/${userId}`);
  }

  createOrder(total: number): Observable<any> {
    const token = this.getToken(); 
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(this.baseApiUrl +`order`, { total },{headers});
  }
}
