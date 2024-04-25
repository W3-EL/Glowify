import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/Services/shared.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {

  constructor(public shared : SharedService) { }

  ngOnInit(): void {
    
  }

}
