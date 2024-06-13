import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/Models/user.model';
import {SharedService} from 'src/app/Services/shared.service'
import {AuthService} from 'src/app/Services/auth.service'
import Swal from 'sweetalert2';
import emailjs, { EmailJSResponseStatus } from '@emailjs/browser';

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
    gender: '',
    role : 'user',
  };

  email: string = '';
  password: string = '';
  loginErrorMessage: string = '';
  constructor(public AuthService: AuthService,private SharedService: SharedService,private router: Router) { }

  ngOnInit(): void {

  }
  login(): void {
    this.AuthService.login(this.email, this.password).subscribe(
      ({ user }) => {
        if (user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/shop']);
        }
      },
      error => {
        this.loginErrorMessage = error.error.error;
        console.error('Login error:', error.error);
      }
    );
  }

  onSubmit(){
    console.log('Form Data:', this.userData);
    this.SharedService.signUpUser(this.userData)
    .subscribe(
      (response) => {
        this.sendEmail();
        Swal.fire({
          icon: "success",
          title: "Welcome",
          width: 300,
          background: "transparent",
          padding: "10em 1em 1em 1em ",
          color: "#d39715",
          backdrop: `
          rgba(0,0,0,0.7)
          url("../../../../../assets/alert/alert.png")
          center
          no-repeat
        `,
          showConfirmButton: false,
          timer: 2000
        });
        setTimeout(() => {
          if (this.userData.password)
          this.AuthService.login(this.userData.email, this.userData.password).subscribe(
            ({ user }) => {
              if (user.role === 'admin') {
                this.router.navigate(['/admin']);
              } else {
                this.router.navigate(['/shop']);
              }
            },
            error => {
              this.loginErrorMessage = error.error.error;
              console.error('Login error:', error.error);
            }
          );
      
        }, 2000);
        console.log('Sign up successful:', response);
      },
      (error) => {
        Swal.fire({
          title: "ERROR adding User",
          width: 300,
          text: error.error.error,
          padding: "10em 1em 1em 1em ",
          color: "#d39715",
          background: "transparent",
          backdrop: `
          rgba(0,0,0,0.7)
          url("../../../../../assets/alert/alert.png")
          center
          no-repeat
        `,
          confirmButtonColor:"#d39715"
        }); 
  
        console.error('Sign up error:', error);
      }
    );
  }
    
  sendEmail(): void {
    const templateParams = {
      fullname: this.userData.fullname,
      email: this.userData.email
    };
  
    emailjs.send('service_tl0mmi9', 'template_kdt7y7m', templateParams, 'AD45IWJuv8I55skNp')
      .then((result: EmailJSResponseStatus) => {
        console.log('Email sent successfully:', result.text);
      })
      .catch((error) => {
        console.error('Error sending email:', error);
        // Log detailed error response if available
        if (error.status === 422) {
          console.error('Validation error:', error.response);
        }
      });
  }
  
  
  
} 


