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

  // deleteContact(contactId: number): void {
  //   this.shared.deleteContact(contactId).subscribe(
  //     (data: Contact[]) => {
  //       Swal.fire({
  //         icon: "success",
  //         title: "Customer Deleted successfully",
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
  //       console.log('Customer deleted:', data);
  //     },
  //     (error) => {
  //       // Handle error
  //       console.error('Error deleting Customer:', error);
  //     }
  //   );
  // }

}
