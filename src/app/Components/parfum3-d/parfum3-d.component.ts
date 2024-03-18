import { AfterViewInit, Component, ElementRef, ViewChild,inject } from '@angular/core';
import { ThreeJSService } from 'src/app/Services/three-js.service';

@Component({
  selector: 'app-parfum3d',
  templateUrl: './parfum3-d.component.html',
  styleUrls: ['./parfum3-d.component.css']
})
export class Parfum3DComponent implements AfterViewInit{
  ThreeJSService:ThreeJSService=inject(ThreeJSService);
  @ViewChild('viz') viz! :ElementRef;

  ngAfterViewInit(): void {
    const vizDiv: HTMLDivElement = this.viz.nativeElement;
    this.ThreeJSService.setDims(vizDiv);
    this.ThreeJSService.setupCamera( );
    this.ThreeJSService.addMesh();
    this.ThreeJSService.setupRender();
    this.ThreeJSService.attachDom(vizDiv);

  }

}
