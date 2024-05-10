import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
// import { categories } from 'src/app/Models/categories.model';
import Swal from 'sweetalert2';


@Component({
  selector: '.categories-bar',
  templateUrl: './categories-bar.component.html',
  styleUrls: ['./categories-bar.component.css']
})
export class CategoriesBarComponent implements OnInit {
  showAddLine: boolean = false;
  categoriesIdToUpdate: any;

  constructor(public shared : SharedService) { }

  // categoriesForm: categories = {
  //   categoriesId: 0,
  //   firstName: '',
  //   lastName: '',
  //   age: 0,
  //   pic: ''
  // };
  
  ngOnInit(): void {
    this.getAllCategories();
  }
  getAllCategories(){
    // this.shared.getAllCategories().subscribe(
    //   (data: categories[]) => {
    //     this.shared.categories=data;

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
  // addNewCategories():void {

  //   this.shared.saveCategories(this.categoriesForm).subscribe(
  //     (response) => {
  //       console.log('Added new categories:', response);
  //       Swal.fire({
  //         icon: "success",
  //         title: "Category added successfully",
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
  //     },
  //     (error) => {
  //       Swal.fire({
  //         title: "ERROR adding Category",
  //         width: 300,
  //         text: 'You are missing something to add',
  //         padding: "1em",
  //         color: "#F4DFBA",
  //         background: "transparent",
  //         backdrop: `
  //           rgba(0,0,0,0.7)
  //           url("../../../assets/alert.png")
  //           center
  //           no-repeat
  //         `,
  //         confirmButtonColor:"#876445"
  //       });        

  //       console.error('Error adding categories:', error);

  //     } 
  //   )}

    // deleteCategories(courseId: number): void {
    //   this.shared.deleteCategories(courseId).subscribe(
    //     (data: categories[]) => {
    //       Swal.fire({
    //         icon: "success",
    //         title: "Category Deleted successfully",
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
    //       console.log('Category deleted:', data);
    //     },
    //     (error) => {
    //       // Handle error
    //       console.error('Error deleting Category:', error);
    //     }
    //   );
    // }


}
