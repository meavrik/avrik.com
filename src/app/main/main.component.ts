import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  currentFocus
  @ViewChild('inp') inp: ElementRef;

  completeArr = ['About', 'contact', 'history', 'what', 'who', 'why', 'story', 'portfolio']
  suggestionsArr = [];
  searchStr = '';
  constructor() { }

  ngOnInit() {
  }

  onInputChange(event) {

    this.suggestionsArr = this.searchStr ? this.completeArr.filter(a => a.indexOf(this.searchStr) !== -1) : [];
  }

}
