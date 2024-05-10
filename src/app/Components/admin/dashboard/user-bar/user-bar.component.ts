import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { user } from 'src/app/Models/user.model';
import { SharedService } from 'src/app/Services/shared.service';
import Swal from 'sweetalert2';


@Component({
  selector: '.user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.css']
})
export class UserBarComponent implements OnInit {
  showAddLine: boolean = false;
  constructor(public shared : SharedService) { }
  userForm: user = {
    fullname: '',
    email: '',
    password: '', // Excluded from the frontend model, but required for form binding
    gender: ''

  };
  userData: user = {
    fullname: '',
    email: '',
    password: '', 
    phone:0,
    gender: ''
  };

  selectedUser: any;

  showDetails(user: any) {
    this.selectedUser = user;
  }
  closeDetails() {
    this.selectedUser = null;
    if(this.showAddLine){
      this.showAddLine=!this.showAddLine
    }
  }
  ngOnInit(): void {
    this.getAllUsers();
  }
  getAllUsers(){
    this.shared.getAllUser().subscribe(
      (data: user[]) => {
        this.shared.user=data;

        console.log(data);
      },
      (error) => {
        // Handle errors here
        console.error('Error:', error);
      }
    );
  }
  toggleAddLine(): void {
    this.showAddLine = !this.showAddLine;
  }
  onSubmit(){
    console.log('Form Data:', this.userData);
    this.shared.signUpUser(this.userData)
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
      },
      (error) => {
        Swal.fire({
        title: "ERROR adding User",
        width: 300,
        text: 'You are missing something to add',
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

  // addNewUser():void {

  //   this.shared.addCustomer(this.userForm).subscribe(
  //     (response) => {
  //       console.log('Added new user:', response);
  //       Swal.fire({
  //         icon: "success",
  //         title: "User added successfully",
  //         width: 300,
  //         background: "transparent",
  //         backdrop: `
  //         rgba(0,0,0,0.7)
  //         url("../../../assets/alert.png")
  //         center
  //         no-repeat
  //       `,  
  //         showConfirmButton: false,
  //         timer: 3000
  //       });
  //       setTimeout(() => {
  //         window.location.reload();
  //       }, 3000);
  //     },
  //     (error) => {
  //       Swal.fire({
  //         title: "ERROR adding User",
  //         width: 300,
  //         text: 'You are missing something to add',
  //         padding: "1em",
  //         color: "#F4DFBA",
  //         background: "transparent",
  //         backdrop: `
  //           rgba(0,0,0,0.7)
  //           url("../../../assets/alert.png")
  //           center
  //           no-repeat
  //         `,
  //         confirmButtonColor:"#876445"
  //       });        

  //       console.error('Error adding Users:', error);

  //     } 
  //   )}

    deleteUser(userId: number): void {
      this.shared.deleteUser(userId).subscribe(
        (data: user[]) => {
          Swal.fire({
            icon: "success",
            title: "User Deleted successfully",
            width: 300,
            background: "transparent",
            backdrop: `
            rgba(0,0,0,0.7)
            url("../../../assets/alert.png")
            center
            no-repeat
          `,  
            showConfirmButton: false,
            timer: 3000
          });
          setTimeout(() => {
            window.location.reload();
          }, 3000);
          console.log('User deleted:', data);
        },
        (error) => {
          // Handle error
          console.error('Error deleting User:', error);
        }
      );
    }





}
