import { Component, OnInit } from '@angular/core';
import { user } from 'src/app/Models/user.model';
import {SharedService} from 'src/app/Services/shared.service'
@Component({
  selector: '.app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData: user = {
    fullname: '',
    email: '',
    password: '', // Excluded from the frontend model, but required for form binding
    gender: ''
  };
  constructor(private SharedService: SharedService) { }

  ngOnInit(): void {

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


