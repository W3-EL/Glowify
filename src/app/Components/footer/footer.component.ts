import { Component, OnInit } from '@angular/core';
import { Contact } from 'src/app/Models/contact.model';
import { SharedService } from 'src/app/Services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  ContactForm: Contact = {
    fullname_contact: '',
    email: '',
    phone:'',
    message: ''
  };
  GlowifyMail='Glowify.store@gmail.com';
  constructor(public shared : SharedService) { }

  ngOnInit(): void {
  }
  addNewContact():void {
    this.shared.addContact(this.ContactForm).subscribe(
      (response) => {
        console.log('Added new Contact:', response);
        Swal.fire({
          icon: "success",
          title: "Contact added successfully",
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
          timer: 3000,
        });
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      },
      (error) => {
        Swal.fire({
          title: "ERROR adding Contact",
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
  
          confirmButtonColor:"#876445"
        });        

        console.error('Error adding Contact:', error);

      } 
    )}

}
