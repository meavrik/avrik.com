import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'show-case',
  templateUrl: './showcase.component.html',
  styleUrls: ['./showcase.component.css']
})
export class ShowcaseComponent implements OnInit {

  items:any[] = []
  data = [
    { title:"Javascript" }
  ]

  constructor() 
  { 
    for (let i = 0; i < 500; i++) {
      this.items.push({});
      
    }
  }

  ngOnInit() {
  }

}
