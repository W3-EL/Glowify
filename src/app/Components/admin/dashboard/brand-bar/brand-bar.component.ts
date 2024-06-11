import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { Brand } from 'src/app/Models/brand.model';
import { SharedService } from 'src/app/Services/shared.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-brand-bar',
  templateUrl: './brand-bar.component.html',
  styleUrls: ['./brand-bar.component.css']
})
export class BrandBarComponent implements OnInit {
  imgBaseUrl: string = "../../../../assets/brands/";

  brandData: Brand = {
    name: '',
    logo:''
  };
  constructor(public shared : SharedService) { }
  showAddLine: boolean = false;
  selectedBrand: any;

  ngOnInit(): void {
    this.getAllBrand();
  }
  showDetails(Brand: any) {
    this.selectedBrand = Brand;
  }
  closeDetails() {
    this.selectedBrand = null;
    if(this.showAddLine){
      this.showAddLine=!this.showAddLine
    }
    this.updatebutton = false;

  }
    toggleAddLine(): void {
      this.showAddLine = !this.showAddLine;
  }
  onUpdateButtonClick(brand:any): void {
    this.updatebutton = true;
    this.brandData = brand;
    this.toggleAddLine(); 

  }
  onAddButtonClick(): void {
    this.updatebutton = false;
    this.toggleAddLine(); 
  }
  updatebutton:boolean=false;

  getAllBrand(){
    this.shared.getAllBrand().subscribe(
      (response) => {
        if (response.success) {
          console.log(response.data)
          this.shared.Brands = response.data;
        } else {
          console.error('Failed to fetch Brands:');
        }
      },
      (error) => {
        console.error('Error fetching Brands:', error);
      }
    );  
  }
  deleteBrand(BrandId: string): void {
    this.shared.deleteBrand(BrandId).subscribe(
      response => {
        Swal.fire({
          icon: "success",
          title: "Brand Deleted successfully",
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
        console.log('Brand deleted successfully:', response);
        this.shared.Brands = this.shared.Brands.filter(Brand => Brand._id !== BrandId);
      },
      error => {
        Swal.fire({
          title: "ERROR deleting Brand",
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

        console.error('Error deleting Brand:', error);
      }
    );
  }
  addBrand():void {

    this.shared.addBrand(this.brandData).subscribe(
      (response) => {
        console.log('Added new brand:', response);
        Swal.fire({
          icon: "success",
          title: "brand Added successfully",
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
          title: "ERROR Adding brand",
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

        console.error('Error adding brand:', error);

      } 
  )}
  updateBrand(brandId:string | undefined): void {
    if (brandId) {
      this.shared.updateBrand(brandId, this.brandData).subscribe(
        (response) => {
          if (response.success) {
            console.log('brand updated successfully', response.data);
            this.closeDetails()
            Swal.fire({
              icon: 'success',
              title: 'brand updated successfully',
              showConfirmButton: false,
              background:'#eec2c9',
              color:'white',
              timer: 2000
            });
            this.resetCatData();
          } else {
            console.error('Error updating brand', response.error);
          }
        },
        (error) => {
          console.error('Error updating brand', error);
          Swal.fire({
            icon: 'error',
            title: 'Error updating brand',
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
    this.brandData = {
      name: '',
      logo:''
  }
  }
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.brandData.logo = file.name; 
    }
  }
  getProductImgPath(brand: Brand): string {
    return `${this.imgBaseUrl}${brand.logo}`;
  }
}
