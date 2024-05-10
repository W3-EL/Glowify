import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/Models/user.model';
import {SharedService} from 'src/app/Services/shared.service'

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: '.app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData: user = {
    fullname: '',
    email: '',
    password: '', 
    phone:0,
    gender: ''
  };
  email: string = '';
  password: string = '';
  constructor(private SharedService: SharedService,private router: Router) { }

  ngOnInit(): void {

  }
  login(): void {
    this.SharedService.loginUser(this.email, this.password).subscribe(
      ({ user, token }) => {
        console.log('JWT token:', token);
        if (user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/shop']);
        }
      },
      error => {
        // Handle error response
        console.error('Login error:', error);
      }
    );
  }

  onSubmit(){
    console.log('Form Data:', this.userData);
    this.SharedService.signUpUser(this.userData)
    .subscribe(
      (response) => {
        console.log('Sign up successful:', response);
      },
      (error) => {
        console.error('Sign up error:', error);
      }
    );
  }
}


