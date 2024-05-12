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

// productForm: product = {
//   id: 0,
//   title: '',
//   start_date: '',
//   availability: false,
//   coach: {
//     coachId: 0,
//     firstName: '',
//     lastName: '',
//     age: 0,
//     pic: ''
//   },
//   spots: 0,
//   start_time: ''
// };
// addNewproduct():void {

//     this.shared.addproducts(this.productForm).subscribe(
//       (response) => {
//         console.log('Added new product:', response);
//         Swal.fire({
//           icon: "success",
//           title: "product added successfully",
//           width: 300,
//           background: "transparent",
//           backdrop: `
//           rgba(0,0,0,0.7)
//           url("../../../assets/alert.png")
//           center
//           no-repeat
//         `,  
//           showConfirmButton: false,
//           timer: 3000
//         });
//         setTimeout(() => {
//           window.location.reload();
//         }, 3000);
//       },
//       (error) => {
//         Swal.fire({
//           title: "ERROR adding product",
//           width: 300,
//           text: 'You are missing something to add',
//           padding: "1em",
//           color: "#F4DFBA",
//           background: "transparent",
//           backdrop: `
//             rgba(0,0,0,0.7)
//             url("../../../assets/alert.png")
//             center
//             no-repeat
//           `,
//           confirmButtonColor:"#876445"
//         });        

//         console.error('Error adding products:', error);

//       } 
//     )}
    getCoachs():void {
      // this.shared.getAllCoachs().subscribe(
      //   (data: coach[]) => {
      //     this.shared.coachs=data;

      //     console.log(data);
      //   },
      //   (error) => {
      //     // Handle errors here
      //     console.error('Error:', error);
      //   }
      // );
    }
    // deleteproduct(productId: number): void {
    //   this.shared.deleteproduct(productId).subscribe(
    //     (data: product[]) => {
    //       Swal.fire({
    //         icon: "success",
    //         title: "product Deleted successfully",
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
    //       console.log('product deleted:', data);
    //     },
    //     (error) => {
    //       // Handle error
    //       console.error('Error deleting product:', error);
    //     }
    //   );
    // }

    showDetails(user: any) {
      this.selectedProduct = user;
    }
    closeDetails() {
      this.selectedProduct = null;
      if(this.showAddLine){
        this.showAddLine=!this.showAddLine
      }
    }
    toggleAddLine(): void {
      this.showAddLine = !this.showAddLine;
    }
}
