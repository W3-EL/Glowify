import { Component, OnInit } from '@angular/core';
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

  // userForm: Contact = {
  //   id: 0,
  //   fullname: '',
  //   email: '',
  //   phonenumber:'',
  //   message: ''
  // };
  ngOnInit(): void {
    this.getAllContact();
  }
  getAllContact(){
    // this.shared.getAllContact().subscribe(
    //   (data: Contact[]) => {
    //     this.shared.Contact=data;

    //     console.log(data);
    //   },
    //   (error) => {
    //     // Handle errors here
    //     console.error('Error:', error);
    //   }
    // );
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
