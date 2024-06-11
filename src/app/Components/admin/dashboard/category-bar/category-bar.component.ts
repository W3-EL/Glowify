import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { Category } from 'src/app/Models/category.model';
import { SharedService } from 'src/app/Services/shared.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category-bar',
  templateUrl: './category-bar.component.html',
  styleUrls: ['./category-bar.component.css']
})
export class CategoryBarComponent implements OnInit {
  categoryData: Category = {
    name: '',
  };
  constructor(public shared : SharedService) { }
  showAddLine: boolean = false;
  selectedCategory: any;
  ngOnInit(): void {
    this.getAllCat();
  }
  showDetails(Contact: any) {
    this.selectedCategory = Contact;
  }
  closeDetails() {
    this.selectedCategory = null;
    if(this.showAddLine){
      this.showAddLine=!this.showAddLine
    }
    this.updatebutton = false;

  }
    toggleAddLine(): void {
      this.showAddLine = !this.showAddLine;
  }
  onUpdateButtonClick(category:any): void {
    this.updatebutton = true;
    this.categoryData = category;
    this.toggleAddLine(); 

  }
  onAddButtonClick(): void {
    this.updatebutton = false;
    this.toggleAddLine(); 
  }
  updatebutton:boolean=false;

  getAllCat(){
    this.shared.getAllCategory().subscribe(
      (response) => {
        if (response.success) {
          console.log(response.data)
          this.shared.Category = response.data;
        } else {
          console.error('Failed to fetch Category:');
        }
      },
      (error) => {
        console.error('Error fetching Category:', error);
      }
    );  
  }
  deleteCategory(CategoryId: string): void {
    this.shared.deleteCategory(CategoryId).subscribe(
      response => {
        Swal.fire({
          icon: "success",
          title: "Category Deleted successfully",
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
        console.log('Category deleted successfully:', response);
        this.shared.Category = this.shared.Category.filter(Category => Category._id !== CategoryId);
      },
      error => {
        Swal.fire({
          title: "ERROR deleting Category",
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

        console.error('Error deleting Category:', error);
      }
    );
  }
  addNewcategory():void {

    this.shared.addCategory(this.categoryData).subscribe(
      (response) => {
        console.log('Added new category:', response);
        Swal.fire({
          icon: "success",
          title: "category Added successfully",
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
          title: "ERROR Adding category",
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

        console.error('Error adding category:', error);

      } 
  )}
  updatecategory(categoryId:string | undefined): void {
    if (categoryId) {
      this.shared.updateCategory(categoryId, this.categoryData).subscribe(
        (response) => {
          if (response.success) {
            console.log('category updated successfully', response.data);
            this.closeDetails()
            Swal.fire({
              icon: 'success',
              title: 'category updated successfully',
              showConfirmButton: false,
              background:'#eec2c9',
              color:'white',
              timer: 2000
            });
            this.resetCatData();
          } else {
            console.error('Error updating category', response.error);
          }
        },
        (error) => {
          console.error('Error updating category', error);
          Swal.fire({
            icon: 'error',
            title: 'Error updating category',
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
  resetCatData(): void {
    this.categoryData = {
      name: '',
  }
  }
}
