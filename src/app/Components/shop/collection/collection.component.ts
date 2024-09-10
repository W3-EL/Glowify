import { Component, ElementRef, OnInit, QueryList,Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from 'src/app/Services/shared.service';
import { product } from 'src/app/Models/product.model';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  @ViewChild('discountButton') discountButton!: ElementRef;
  maleChecked: boolean = false;
  femaleChecked: boolean = false;
  discountChecked: boolean = false;
  imgBaseUrl: string = "../../../../assets/product/";
  brandBaseUrl: string = "../../../../assets/brands/";
  filteredProducts: product[] = [];

  constructor(private route: ActivatedRoute,public shared: SharedService, private router: Router) { 
    this.filterProducts();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const selectedCategory = params['discount'];
      if (params['male']) {
        this.maleChecked = true;
      } else if (params['female']) {
        this.femaleChecked = true;
      }  else if (params['discount']) {

          this.sortProducts('discount'); 
        
      }
      
    });

    this.getAllProducts();
  }
  getAllProducts(): void {
    this.shared.getAllProduct().subscribe(
      (response) => {
        if (response.success) {
          this.shared.products = response.data;
          this.filteredProducts = response.data;
          this.filterProducts();
        } else {
          console.error('Error');
        }
      },
      (error) => {
        console.error('HTTP Error:', error);
      }
    );
  }
  sendProductDetails(product: product): void {
    this.shared.addProductDetails(product);
    this.router.navigate(['/shop/products']);
  }

  getProductImgPath(product: product): string {
    return `${this.imgBaseUrl}${product.img}`;
  }

  getBrandImgPath(product: product): string {
    if (product.brand) 
    return `${this.brandBaseUrl}${product.brand.logo}`;
  else
    return 'error'
  }

  filterProducts(): void {
    const searchTerm = this.shared.selectedProduct.toLowerCase();
    this.filteredProducts = (this.shared.products ?? []).filter(product => {
      const matchesCategory = (this.shared.selectedCategories ?? []).length === 0 || (product.category?.name && this.shared.selectedCategories.includes(product.category.name));
      const matchesBrand = (this.shared.selectedBrand ?? []).length === 0 || (product.brand?.name && this.shared.selectedBrand.includes(product.brand.name));
      const matchesGender = (this.shared.selectedGenders ?? []).length === 0 || this.shared.selectedGenders.includes(product.gender);
      const matchesSearch = searchTerm === '' ||
      product.product_name.toLowerCase().includes(searchTerm) ||
      (product.category?.name && product.category.name.toLowerCase().includes(searchTerm)) ||
      (product.brand?.name && product.brand.name.toLowerCase().includes(searchTerm)) ;
      return matchesCategory && matchesBrand && matchesGender && matchesSearch; 
    });
  }
  
  onProductNameToggle(event: any): void {
    const searchTerm = event.target.value;
    this.shared.selectedProduct = searchTerm;
    this.filterProducts();
  }

  onCategoryToggle(category: string, event: any): void {
    if (event.target.checked) {
      this.shared.selectedCategories.push(category);
    } else {
      this.shared.selectedCategories = this.shared.selectedCategories.filter(c => c !== category);
    }
    this.filterProducts();
  }
  onBrandToggle(brand: string, event: any): void {
    if (event.target.checked) {
      this.shared.selectedBrand.push(brand);
    } else {
      this.shared.selectedBrand = this.shared.selectedBrand.filter(b => b !== brand);
    }
    this.filterProducts();
  }


  onGenderToggle(gender: string, event: any): void {
    if (event.target.checked) {
      this.shared.selectedGenders.push(gender);
    } else {
      this.shared.selectedGenders = this.shared.selectedGenders.filter(g => g !== gender);
    }
    this.filterProducts();
  }
  removeCategory(category: string): void {
    this.shared.selectedCategories = this.shared.selectedCategories.filter(c => c !== category);
    this.filterProducts();
    this.declick(category);

  }

  removeSearch(): void {
    this.shared.selectedProduct = '';
    this.filterProducts();


  }


  removeBrand(brand: string): void {
    this.shared.selectedBrand = this.shared.selectedBrand.filter(b => b !== brand);
    this.declick(brand);
    this.filterProducts();
  }
  declick(id:string){
    const checkbox = document.getElementById(id) as HTMLInputElement;
        if (checkbox) {
            checkbox.click();
        } else {
            console.error("Checkbox not found!");
        }

  }
  removeGender(gender: string): void {
    this.shared.selectedGenders = this.shared.selectedGenders.filter(g => g !== gender);
    this.declick(gender);
    this.filterProducts();
  }
  
  sortProducts(criteria: string) {
    if (criteria === 'alphabetically') {
        this.filteredProducts.sort((a, b) => a.product_name.localeCompare(b.product_name));
    } else if (criteria === 'newest') {
        this.filteredProducts.sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
            return dateB - dateA;
        });
    } else if (criteria === 'discount') {
        this.filteredProducts.sort((a, b) => {
            const soldeA = a.solde || 0;
            const soldeB = b.solde || 0;
            return soldeB - soldeA;
        });
    }
}

  isNewProduct(createdAt: Date | undefined): boolean {
    if (!createdAt) {
      return false; // Return false if createdAt is undefined
    }
    const today = new Date();
    const productDate = new Date(createdAt);
    return productDate.toDateString() === today.toDateString();
  }

  collapse(){
    const toggleDiv = document.getElementById('toggleDiv');
    if (toggleDiv) {
      if (toggleDiv.style.display === 'none'|| toggleDiv.style.display === '') {
        toggleDiv.style.display = 'flex';
        const divHeight = 86 + 'vh';
        toggleDiv.style.height = '0';
        toggleDiv.style.opacity = '0';
        setTimeout(() => {
          toggleDiv.style.height = divHeight;
          toggleDiv.style.opacity = '1';
        }, 10);      
      } else {
        toggleDiv.style.height = '0';
        toggleDiv.style.opacity = '0';
        setTimeout(() => {
          toggleDiv.style.display = '';
        }, 500);
      }
    }
  }

}
