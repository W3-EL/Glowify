import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {

  constructor() { }

  mouseX: number = 0;
  mouseY: number = 0;

  onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX ;
    this.mouseY = event.clientY ;
  }

  getTransformValues() {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const deltaX = this.mouseX - centerX;
    const deltaY = this.mouseY - centerY;
    const angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    const offsetX = deltaX / 10;
    const offsetY = deltaY / 10;
    const rotationZ = angle * 0.05; 
    return `translate(${offsetX}px, ${offsetY}px) rotateZ(${rotationZ}deg)`;
  }
  ngOnInit(): void {
  }

}
