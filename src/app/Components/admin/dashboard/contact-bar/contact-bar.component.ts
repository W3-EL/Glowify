import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { Contact } from 'src/app/Models/contact.model';
import { SharedService } from 'src/app/Services/shared.service';
// import { Contact } from 'src/app/Models/contact.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-bar',
  templateUrl: './contact-bar.component.html',
  styleUrls: ['./contact-bar.component.css']
})
export class ContactBarComponent implements OnInit {
  showAddLine: boolean = false;

  constructor(public shared : SharedService) { }
  contacts: Contact[] = [];

  selectedContact: any;

  showDetails(Contact: any) {
    this.selectedContact = Contact;
  }
  closeDetails() {
    this.selectedContact = null;
    if(this.showAddLine){
      this.showAddLine=!this.showAddLine
    }
  }
  ngOnInit(): void {
    this.getAllContact();
  }
  getAllContact(){
    this.shared.getAllContact().subscribe(
      (response) => {
        if (response.success) {
          this.shared.Contact = response.data;
        } else {
          console.error('Failed to fetch contacts:');
        }
      },
      (error) => {
        console.error('Error fetching contacts:', error);
      }
    );  
  }
  toggleAddLine(): void {
    this.showAddLine = !this.showAddLine;
  }

  deletecontact(contactId: string): void {
    this.shared.deleteContact(contactId).subscribe(
      response => {
        Swal.fire({
          icon: "success",
          title: "contact Deleted successfully",
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
        console.log('User deleted successfully:', response);
        this.contacts = this.contacts.filter(contact => contact._id !== contactId);
      },
      error => {
        Swal.fire({
          title: "ERROR deleting contact",
          width: 300,
          text: error.error.message,
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

        console.error('Error deleting contact:', error);
      }
    );
  }


}
