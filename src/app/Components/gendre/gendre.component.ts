import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-gendre',
  templateUrl: './gendre.component.html',
  styleUrls: ['./gendre.component.css']
})
export class GendreComponent implements OnInit {

  constructor(public shared: SharedService,private router: Router) { }

  ngOnInit(): void {
  }

  goToShopWithMale(): void {
    this.router.navigate(['/shop'], { queryParams: { male: true } });
    this.shared.selectedGenders.push('Male');
  }

  goToShopWithFemale(): void {
    this.router.navigate(['/shop'], { queryParams: { female: true } });
    this.shared.selectedGenders.push('Female');

  }

}
