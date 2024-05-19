import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-top-categories',
  templateUrl: './top-categories.component.html',
  styleUrls: ['./top-categories.component.css']
})
export class TopCategoriesComponent implements OnInit {

  constructor(public shared: SharedService,private router: Router) { }

  ngOnInit(): void {
  }
  goToShopWithCat(cat:string): void {
    this.router.navigate(['/shop'], { queryParams: { lipstick: true } });
    this.shared.selectedCategories.push(cat);
  }

}
