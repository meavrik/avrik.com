import { Component, OnInit, Input } from '@angular/core';
import { SpaService } from './spa.service';

@Component({
  selector: 'spa',
  templateUrl: './spa.component.html',
  styleUrls: ['./spa.component.css']
})
export class SpaComponent implements OnInit {
  chartData;
  @Input() title = '2017 - 2018';

  data = {
    filters: [
      {
        title: 'front-end knowledge', options:
          [
            { label: 'html5', value: '' },
            { label: 'css6', value: '' },
            { label: 'angular', value: '' },
            { label: 'angular-cli', value: '' },
            { label: 'react', value: '' },
            { label: 'typescript', value: '' },
          ]
      },
      {
        title: 'back-end knowledge', options:
          [
            { label: 'nodeJS', value: '' },
            { label: 'loop-back', value: '' },
            { label: 'elastic-search', value: '' },
          ]
      },
      {
        title: 'general knowledge', options:
          [
            { label: 'git', value: '' },
            { label: 'npm', value: '' },
            { label: 'docker', value: '' },
            { label: 'logstash', value: '' },
          ]
      }
    ]
  };

  constructor(private spaService: SpaService) { }

  ngOnInit() {
    let temp_max: any[];
    let temp_min: any[];
    let weatherDates: any[];

    this.spaService.getWeather().subscribe(res => {
      if (!res) return;
      temp_max = res.list.map(a => a.main.temp_max);
      temp_min = res.list.map(a => a.main.temp_min);
      weatherDates = res.list.map(a => new Date(a.dt * 1000).toLocaleTimeString('en', { year: 'numeric', month: 'short' }));


      this.chartData = {
        type: 'line',
        data: {
          labels: weatherDates,
          datasets: [
            {
              data: temp_max,
              borderColor: '#3cba9f',
              fill: false
            },
            {
              data: temp_min,
              borderColor: '#ffcc00',
              fill: false
            },
          ]
        },
        options: {
          legend: {
            display: false
          },
          scales: {
            xAxes: [{
              display: true
            }],
            yAxes: [{
              display: true
            }],
          }
        }
      };
    }, error => {
      console.log('error ' + error.message);
    });
  }
}