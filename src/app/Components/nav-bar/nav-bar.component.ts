import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';
import {AuthService} from 'src/app/Services/auth.service'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(public shared : SharedService,public AuthService: AuthService) { }

  ngOnInit(): void {
  }

}
