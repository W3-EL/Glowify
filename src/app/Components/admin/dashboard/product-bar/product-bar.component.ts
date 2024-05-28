import { Component, OnInit, ViewChild } from '@angular/core';
import { product } from 'src/app/Models/product.model';
import { SharedService } from 'src/app/Services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: '.product-bar',
  templateUrl: './product-bar.component.html',
  styleUrls: ['./product-bar.component.css']
})
export class ProductBarComponent implements OnInit {
  products: product[] = [];
  imgBaseUrl: string = "../../../../assets/product/";
  productData: product = {
    product_name: '',
    desc_prod: '',
    price: 50, 
    stock: 100,
    img:'',
    gender:'',
    category:{
      name:'',
    },
    brand: {
      name:'',
      logo:'',
    }
  };
  showAddLine: boolean = false;
  selectedProduct: any;
  updatebutton:boolean=false;

  constructor(public shared : SharedService) { }


  ngOnInit(): void {
    this.getAllProduct();

  }
  getAllProduct(){
    this.shared.getAllProduct().subscribe(
      (response) => {
        if (response.success) {
          this.shared.products = response.data;
        } else {
          console.error('Failed to fetch products:');
        }
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );  
  }



  addNewproduct():void {

    this.shared.addProduct(this.productData).subscribe(
      (response) => {
        console.log('Added new product:', response);
        Swal.fire({
          icon: "success",
          title: "Product Added successfully",
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
          title: "ERROR Adding Product",
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

        console.error('Error adding products:', error);

      } 
  )}
  updateProduct(productId:string | undefined): void {
    if (productId) {
      this.shared.updateProduct(productId, this.productData).subscribe(
        (response) => {
          if (response.success) {
            console.log('Product updated successfully', response.data);
            this.closeDetails()
            Swal.fire({
              icon: 'success',
              title: 'Product updated successfully',
              showConfirmButton: false,
              background:'#eec2c9',
              color:'white',
              timer: 2000
            });
            this.resetProductData();
          } else {
            console.error('Error updating product', response.error);
          }
        },
        (error) => {
          console.error('Error updating product', error);
          Swal.fire({
            icon: 'error',
            title: 'Error updating product',
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


  deleteproduct(productId: string): void {
    this.shared.deleteProduct(productId).subscribe(
      response => {
        Swal.fire({
          icon: "success",
          title: "product Deleted successfully",
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
        console.log('product deleted successfully:', response);
        this.products = this.products.filter(product => product._id !== productId);
      },
      error => {
        Swal.fire({
          title: "ERROR deleting product",
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

        console.error('Error deleting product:', error);
      }
    );
  }


  
    showDetails(product: any) {
      this.selectedProduct = product;
    }
    closeDetails() {
      this.selectedProduct = null;
      if(this.showAddLine){
        this.showAddLine=!this.showAddLine
      }
      this.updatebutton = false;
    }


    toggleAddLine(): void {
      this.showAddLine = !this.showAddLine;
    }

    onUpdateButtonClick(product:any): void {
      this.updatebutton = true;
      this.productData = product;
      this.toggleAddLine(); 

    }
  
    onAddButtonClick(): void {
      this.updatebutton = false;
      this.toggleAddLine(); 
    }
    onFileChange(event: Event): void {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length > 0) {
        const file = input.files[0];
        this.productData.img = file.name; 
      }
    }
    getProductImgPath(product: product): string {
      return `${this.imgBaseUrl}${product.img}`;
    }

    resetProductData(): void {
      this.productData = {
        product_name: '',
        desc_prod: '',
        price: 50,
        stock: 100,
        img: '',
        gender: '',
        category: {
          name: '',
        },
        brand: {
          name: '',
          logo: '',
        }
      };
    }
}
