import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'filter-dropdown',
  templateUrl: './filter-dropdown.component.html',
  styleUrls: ['./filter-dropdown.component.css']
})
export class FilterDropdownComponent implements OnInit {
  @Input() data;

  constructor() { }

  ngOnInit() {
    this.data;
    //debugger;
  }

}
