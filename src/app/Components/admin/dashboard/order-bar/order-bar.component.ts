import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Models/order.model';
import { SharedService } from 'src/app/Services/shared.service';
import Swal from 'sweetalert2';
import { product } from 'src/app/Models/product.model';

@Component({
  selector: '.order-bar',
  templateUrl: './order-bar.component.html',
  styleUrls: ['./order-bar.component.css']
})
export class OrderBarComponent implements OnInit {
  imgBaseUrl: string = "../../../../assets/product/";
  statusData = 'Pending';
  statusForm = false;
  showAddLine: boolean = false;
  orders: Order[] = [];
  error: string = '';
  selectedOrder: any;
  constructor(public shared : SharedService) { }

  ngOnInit(): void {
    this.getAllorder()
  }
  
  getAllorder() {
    this.shared.getAllUsersOrders().subscribe(
      (response) => {
        if (response.success) {
          this.orders = response.data;
          this.orders.sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
          });
        } else {
          this.error = 'Failed to load orders';
        }
      },
      (error) => {
        this.error = 'Error fetching orders';
      }
    );
  }
  

  showDetails(order: any) {
    this.selectedOrder = order;

  }

  closeDetails() {
    this.selectedOrder = null;
    if(this.showAddLine){
      this.showAddLine=!this.showAddLine
    }
  }

  getProductImgPath(product: product): string {
    return `${this.imgBaseUrl}${product.img}`;
  }

  toggelUpdate(){
    this.statusForm = !this.statusForm;
  }
  
  updateOrder(orderId:string | undefined): void {
    if (orderId) {
      this.shared.updateOrder(orderId, this.statusData).subscribe(
        (response) => {
          if (response.success) {
            this.closeDetails()
            Swal.fire({
              icon: 'success',
              title: 'Status updated successfully',
              showConfirmButton: false,
              background:'#eec2c9',
              color:'white',
              timer: 2000
            });
            setTimeout(() => {
              window.location.reload();
            }, 2000);
          } else {
            console.error('Error updating Status', response.error);
          }
        },
        (error) => {
          console.error('Error updating Status', error);
          Swal.fire({
            icon: 'error',
            title: 'Error updating Status',
            text: 'Please try again.',
            background:'#eec2c9',
            showConfirmButton: true,
            color:'white',
            confirmButtonColor:"black"
          });
        }
      );
    }
  }
  deletOrder(Id: string | undefined): void {
    if(Id){
    this.shared.deleteOrder(Id).subscribe(
      response => {
        Swal.fire({
          icon: 'success',
          title: 'Order deleted successfully',
          showConfirmButton: false,
          background:'#eec2c9',
          color:'white',
          timer: 2000
        });
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error deleting Order',
          text: 'Please try again.',
          background:'#eec2c9',
          showConfirmButton: true,
          color:'white',
          confirmButtonColor:"black"
        });
      }
    );}
  }


  getStatusClass(status: string): string {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'status-pending';
      case 'on_hold':
        return 'status-on-hold';
      case 'shipped':
        return 'status-shipped';
      case 'delivered':
        return 'status-delivered';
      case 'canceled':
        return 'status-canceled';
      default:
        return '';
    }
  }

}
