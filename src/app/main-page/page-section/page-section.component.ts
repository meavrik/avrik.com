import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'page-section',
  templateUrl: './page-section.component.html',
  styleUrls: ['./page-section.component.css']
})



export class PageSectionComponent implements OnInit {
  @Input() data:string;
 // @Input() title:string;
 // @Input() color:string;

  constructor() { }

  ngOnInit() {
  }


}
