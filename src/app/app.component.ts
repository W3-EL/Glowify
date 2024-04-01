import { Component,AfterViewInit,inject,ViewChild,ElementRef } from '@angular/core';
import * as THREE from 'three';
import { ThreeJSService } from './Services/three-js.service';
import { RouterOutlet } from '@angular/router';
import { Parfum3DComponent } from './Components/parfum3-d/parfum3-d.component';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent  {

}
