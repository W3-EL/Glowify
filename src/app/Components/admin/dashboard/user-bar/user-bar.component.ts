import { Component, Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Address } from 'src/app/Models/address.model';
import { CartItem } from 'src/app/Models/cartItem.model';
import { product } from 'src/app/Models/product.model';
import { user } from 'src/app/Models/user.model';
import { AuthService } from 'src/app/Services/auth.service';
import { SharedService } from 'src/app/Services/shared.service';
import Swal from 'sweetalert2';


@Component({
  selector: '.user-bar',
  templateUrl: './user-bar.component.html',
  styleUrls: ['./user-bar.component.css']
})
export class UserBarComponent implements OnInit {
  showAddLine: boolean = false;
  showAddress: boolean = false;
  userHasAddress: boolean = false;

  address: Address = {
    address: '',
    city: '',
    state: '',
    additionalInformation:''
  };
  cartItems: CartItem[] = [];
  ImgUrl: string = "../../../../assets/product/";
  products: any[] = [];

  constructor(public shared : SharedService, public auth: AuthService) { }
  userData: user = {
    fullname: '',
    email: '',
    password: '', 
    phone:0,
    gender: '',
    role : 'user',
  };
  users: user[] = [];
  selectedUser: any;

  toggleaddress(userId :string): void {
    this.showAddress = !this.showAddress;
    this.shared.getSpecificAddress(userId)
      .subscribe(
        (response) => {
          this.address = response.data;
          this.userHasAddress = true;
        },
        (error) => {
          console.error('Error fetching address:', error);
          // Handle error, display error message, etc.
        }
      );
  }
  closeAddress() {
    if(this.showAddress){
      this.showAddress=!this.showAddress
    }
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

  showDetails(user: any) {
    this.selectedUser = user;
      if (user) {
        this.shared.getCart(user._id).subscribe(
          async (response: any) => {
            if (response.success) {
              const cart = response.data;
              console.log('Cart:', cart.products); // Display the cart products array
              this.products = cart.products;
              this.cartItems = [];
              for (const cartProduct of cart.products) {
                const productId = cartProduct.product;
                const quantity = cartProduct.quantity;
  
                try {
                  const productResponse = await firstValueFrom(this.shared.getProductById(productId));
                  if (productResponse && productResponse.success) {
                    const productDetails: any = productResponse.data; // Fetch product as Product
                    productDetails.img = this.ImgUrl + productDetails.img; // Update image URL
                    const totalProductPrice = productDetails.price * quantity; // Calculate total price for the product
                    const cartItem: CartItem = {
                      product: productDetails,
                      quantity: quantity,
                      totalProductPrice: totalProductPrice // Assign total price to cart item
                    };
                    this.cartItems.push(cartItem); // Add to cart items
                  }
                } catch (error) {
                  console.error('Error fetching product details:', error);
                }
              }
            } else {
              console.error('Error fetching cart:', response);
            }
          },
          (error) => {
            console.error('Error fetching cart:', error);
          }
        );
      } else {
        console.error('User ID not found', user._id);
      }
  }




  deleteUser(userId: string): void {
    this.shared.deleteUser(userId).subscribe(
      response => {
        Swal.fire({
          icon: "success",
          title: "User Deleted successfully",
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
          window.location.reload();
        }, 2000);
        console.log('User deleted successfully:', response);
        this.users = this.users.filter(user => user._id !== userId);
      },
      error => {
        Swal.fire({
          title: "ERROR deleting User",
          width: 300,
          text: error.error,
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

        console.error('Error deleting user:', error);
      }
    );
  }
  getProductImgPath(product: product): string {
    return `path_to_your_images/${product.img}`;
  }

  updateUsersToAdmin(): void {
    if (this.selectedUser) {
      const newRole = this.selectedUser.role === 'user' ? 'admin' : 'user';
      this.shared.updateUsersToAdmin(this.selectedUser._id, newRole).subscribe(
        (response) => {
          if (response.success) {
            console.log('User updated successfully', response.data);
            this.closeDetails()
            Swal.fire({
              icon: 'success',
              title: 'User updated to Admin successfully',
              showConfirmButton: false,
              background:'#eec2c9',
              color:'white',
              timer: 2000
            });
          setTimeout(() => {
            window.location.reload();
          }, 2000);
          } else {
            console.error('Error updating product', response.error);
          }
        },
        (error) => {
          console.error('Error updating User', error);
          Swal.fire({
            icon: 'error',
            title: 'Error updating User',
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
  getAddress(userId:string |undefined): void {
    
    if (userId) {
    this.shared.getSpecificAddress(userId)
      .subscribe(
        (response) => {
          this.address = response.data;
          this.userHasAddress = true;
        },
        (error) => {
          console.error('Error fetching address:', error);
          // Handle error, display error message, etc.
        }
      );
    }
  }

}
