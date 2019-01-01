import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'my-dropdown',
  templateUrl: './my-dropdown.component.html',
  styleUrls: ['./my-dropdown.component.css']
})
export class MyDropdownComponent implements OnInit {

  @Input() title = 'select';
  @Input() options: any[] = [];

  show = false;

  constructor() { }

  ngOnInit() {
    
  }

  onClick() {
    this.show = !this.show;
  }

}
