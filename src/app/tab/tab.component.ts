import { Component, OnInit, Input } from '@angular/core';

export interface ITabData {
  color:any;
  title:string;
  icon:string;
}

@Component({
  selector: 'my-tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.css']
})
export class TabComponent implements OnInit {
  @Input() data:ITabData;

  constructor() { }

  ngOnInit() {
    this.data;

  }

}
