import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'my-chart',
  templateUrl: './my-chart.component.html',
  styleUrls: ['./my-chart.component.css']
})
export class MyChartComponent implements OnInit {
  @Input() data;
  chart;

  constructor() { }

  ngOnInit() {

    this.chart = new Chart('canvas', this.data);
  }

}
