import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import {AuthService} from 'src/app/Services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public shared: SharedService,private router: Router,public AuthService: AuthService) { }

  ngOnInit(): void {
  }
  goToShopWithCat(cat:string): void {
    this.router.navigate(['/shop']);
    this.shared.selectedCategories.push(cat);
  }
}
