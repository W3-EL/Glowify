import { Component, OnInit } from '@angular/core';
import { product } from '../../Models/product.model';
import { CartItem } from '../../Models/cartItem.model';
import { SharedService } from 'src/app/Services/shared.service';
import { AuthService } from 'src/app/Services/auth.service';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  today: Date = new Date();
  weekStart: Date;
  products: any[] = [];
  userId: string = '';
  ImgUrl: string = "../../../../assets/product/";
  number: number = 1;
  promoCodeInput!: string;
  discountAmount = 0;
  finalAmount = 0;
  promoCode = '';
  constructor(public shared: SharedService, public auth: AuthService) {
    const day = this.today.getDay();
    const diff = this.today.getDate() - day + (day === 0 ? -6 : 1);
    this.weekStart = new Date(this.today.setDate(diff));
  }

  ngOnInit(): void {
    this.getCart();
  }

  getCart(): void {
    const userId = this.auth.getUserID();
    if (userId) {
      this.shared.getCart(userId).subscribe(
        async (response: any) => {
          if (response.success) {
            const cart = response.data;
            console.log('Cart:', cart.products); // Display the cart products array
            this.products = cart.products;

            // Reset cart items
            this.cartItems = [];

            // Fetch product details for each product ID in the cart
            for (const cartProduct of cart.products) {
              const productId = cartProduct.product;
              const quantity = cartProduct.quantity;

              try {
                // Fetch product details by ID
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

            this.calculateTotal(); // Calculate the total price of the cart
          } else {
            console.error('Error fetching cart:', response);
          }
        },
        (error) => {
          console.error('Error fetching cart:', error);
        }
      );
    } else {
      console.error('User ID not found', userId);
    }
  }


  calculateTotal(): void {
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    this.finalAmount = this.totalPrice - this.discountAmount;
  }

  removeFromCart(productId: string | undefined): void {
    if (productId) {
      this.shared.removeFromCart(productId).subscribe(
        (response: any) => {
          if (response.success) {
            this.cartItems = this.cartItems.filter(item => item.product._id !== productId);
            this.calculateTotal();
          } else {
            console.error('Error removing product from cart:', response);
          }
        },
        (error) => {
          console.error('Error removing product from cart:', error);
        }
      );
    } else {
      console.error('Product ID is undefined');
    }
  }
  clearCart(): void {
    const userId = this.auth.getUserID();
    if (userId) {
      this.shared.clearCart(userId).subscribe(
        (response: any) => {
          if (response.success) {
            this.cartItems = [];
            this.totalPrice = 0;
            Swal.fire({
              title: "CART CLEARED",
              width: 600,
              background: "#eec2c9",
              color: "black",
              showConfirmButton: false,
              timer: 1000
            });
          } else {
            console.error('Error clearing cart:', response);
          }
        },
        (error) => {
          console.error('Error clearing cart:', error);
        }
      );
    } else {
      console.error('User ID not found', userId);
    }
  }

  proceedToCheckout(): void {
    // Handle checkout process
  }

  getProductImgPath(product: product): string {
    return `path_to_your_images/${product.img}`;
  }

  isNew(product: product): boolean {
    if (!product.createdAt) {
      return false; // or some default behavior
    }
    const createdAt = new Date(product.createdAt);
    return createdAt >= this.weekStart;
  }
  validatePromoCode(): void {
    this.shared.validatePromoCode(this.promoCode).subscribe(
      (response) => {
        if (response.success) {
          this.discountAmount = response.discountAmount;
          this.calculateTotal();
          Swal.fire({
            icon: 'success',
            title: 'Promo code applied!',
            text: `You have received a discount of $${this.discountAmount}.`,
            showConfirmButton: false,
            background:'#efafb9',
            
            timer: 2000
          });
        }
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Invalid promo code',
          text: error.error.message || 'Please try again.',
          background:'#efafb9',
          showConfirmButton: true,
          confirmButtonColor:"black"
        });
      }
    );
  }

}
