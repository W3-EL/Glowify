import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/Models/user.model';
import {SharedService} from 'src/app/Services/shared.service'
import Swal from 'sweetalert2';

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
        token=this.SharedService.token;
        if (user.role === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/shop']);
        }
      },
      error => {

        console.error('Login error:', error);
      }
    );
  }

  onSubmit(){
    console.log('Form Data:', this.userData);
    this.SharedService.signUpUser(this.userData)
    .subscribe(
      (response) => {
        Swal.fire({
          icon: "success",
          title: "User added successfully",
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
          timer: 3000
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
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
}


