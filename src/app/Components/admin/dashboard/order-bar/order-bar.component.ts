import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: '.order-bar',
  templateUrl: './order-bar.component.html',
  styleUrls: ['./order-bar.component.css']
})
export class OrderBarComponent implements OnInit {
  showAddLine: boolean = false;

  constructor(public shared : SharedService) { }

  ngOnInit(): void {
    this.getAllorder()
  }
  
  getAllorder(){
  //   this.shared.getAllorders().subscribe(
  //   (data: order[]) => {
  //     this.shared.order=data;

  //     console.log(data);
  //   },
  //   (error) => {
  //     // Handle errors here
  //     console.error('Error:', error);
  //   }
  // );

  }

  // deleteorder(orderId: number): void {
  //   this.shared.deleteorder(orderId).subscribe(
  //     (data: order[]) => {
  //       Swal.fire({
  //         icon: "success",
  //         title: "order Deleted successfully",
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
  //       console.log('order deleted:', data);
  //     },
  //     (error) => {
  //       // Handle error
  //       console.error('Error deleting order:', error);
  //     }
  //   );
  // }



}
