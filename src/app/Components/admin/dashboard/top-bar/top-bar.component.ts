import { Component, OnInit } from '@angular/core';
import { Routes } from '@angular/router';
import {AuthService} from 'src/app/Services/auth.service'

@Component({
  selector: '.top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})

export class TopBarComponent implements OnInit {

  constructor(public AuthService: AuthService) { }

  ngOnInit(): void {
  }

}
