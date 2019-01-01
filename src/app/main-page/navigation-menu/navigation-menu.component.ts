import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'navigation-menu',
  templateUrl: './navigation-menu.component.html',
  styleUrls: ['./navigation-menu.component.css']
})
export class NavigationMenuComponent implements OnInit {

  data = [
    '2018',
    '2016',
    '2013',
    '2012',
    '2011',
  ];

  constructor() { }

  ngOnInit() {
  }

}
