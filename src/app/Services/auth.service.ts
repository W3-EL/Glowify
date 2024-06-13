import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { user } from '../Models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {SharedService} from 'src/app/Services/shared.service'
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly TOKEN_NAME = 'token';
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn$.asObservable();
  baseApiUrl : string = environment.baseApiUrl;
  user! :user;
  get token():any {
    return localStorage.getItem(this.TOKEN_NAME);
  }
  constructor(private router: Router,private http: HttpClient,private SharedService: SharedService) {
    this._isLoggedIn$.next(!!this.token);

  }

  login(email: string, password: string) {
    return this.SharedService.login(email,password).pipe(
      tap(response => {
        this._isLoggedIn$.next(true)
        localStorage.setItem('token',response.token)
        this.user = this.getUser(response.token)
      })
    )
  }


  getUserID(): string | null {
    const token = this.token;
    if (token) {
      const user = this.getUser(token);
      if (user && user._id) {
        return user._id;
      }
    }
    return null;
  }
  getUserName(): string | null {
    const token = this.token;
    if (token) {
      const user = this.getUser(token);
      if (user && user.fullname) {
        return user.fullname;
      }
    }
    return null;
  }
  getUserPhone(): number | null {
    const token = this.token;
    if (token) {
      const user = this.getUser(token);
      if (user && user.phone) {
        return user.phone;
      }
    }
    return null;
  }
  getUserMail(): string | null {
    const token = this.token;
    if (token) {
      const user = this.getUser(token);
      if (user && user.email) {
        return user.email;
      }
    }
    return null;
  }


  private getUser(token : string):user {
    return JSON.parse(atob(token.split(".")[1])) as user
  }

  setLoggedIn(status: boolean): void {
    this._isLoggedIn$.next(status);
  }

  public isLoggedOut$ = this.isLoggedIn$.pipe(map(isLoggedIn => !isLoggedIn));
  
  logout(): void {
    localStorage.removeItem(this.TOKEN_NAME);
    this._isLoggedIn$.next(false);
    this.user = null!;
    this.router.navigate(['/']);
  }

  getUserRole(token:string): string | null {
    const user = this.getUser(token);
    return user.role || null;
  }
  isAdmin(): boolean {
    const token = this.token;
    return this.getUserRole(token) === 'admin';
  }
}



