import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'my-chips',
  templateUrl: './my-chips.component.html',
  styleUrls: ['./my-chips.component.css']
})
export class MyChipsComponent implements OnInit {
  @Input() data:any[];

  constructor() { }

  ngOnInit() {
  }

}
