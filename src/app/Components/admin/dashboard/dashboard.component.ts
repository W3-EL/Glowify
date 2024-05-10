import { Component, NgModule, OnInit } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { SharedService } from 'src/app/Services/shared.service';
// import { order } from 'src/app/Models/order.model';




@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(public shared : SharedService,private router: Router) { }


  ngOnInit(): void {
  }

}
