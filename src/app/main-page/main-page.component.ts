import { Component, OnInit } from '@angular/core';
import { slideInAnimation } from './../animations';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  animations: [ slideInAnimation ]
})
export class MainPageComponent implements OnInit {


  sections = [
    {
      title: 'About',
      subTitle: 'me',
      icon: 'assets/avrik.gif',
      color: '#0',
      content: `Hello visitor
      welcome to my professional web-site  `
    },
    {
      title: '{ Development }',
      subTitle: 'full stack development',
      icon: 'assets/dev-icon.png',
      color: '#5bc0eb',
      content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sodales, leo non tempor facilisis, nibh tellus
      lacinia enim, eget malesuada enim risus in ipsum. Curabitur magna arcu, aliquet sit amet sodales eu, consectetur
      in neque. Aliquam mollis nisi quis diam pharetra, ac consequat magna iaculis. Pellentesque habitant morbi tristique
      senectus et netus et malesuada fames ac turpis egestas. Etiam convallis maximus dolor, quis lacinia dui lobortis
      condimentum. Maecenas vestibulum condimentum facilisis. Aenean accumsan quis mauris ut iaculis. Donec dapibus eget
      tortor ac pharetra. Donec venenatis ullamcorper nisi, in ullamcorper nulla dictum non.` ,
      icons: [
        { url: 'assets/logos.png', title: 'HTML5+CSS+JS (ES6)' },
        { url: 'assets/angular.png', title: 'Angular 2-6' },
        { url: 'assets/react.png', title: 'React' },
        { url: 'assets/elastic.png', title: 'ELK stack' },
      ],
      knowledge: [
        { title: 'HTML', value: 90, icon: 'assets/html.png' },
        { title: 'CSS', value: 90, icon: 'assets/css.svg' },
        { title: 'JavaScript', value: 80, icon: 'assets/JavaScript.png' },
        { title: 'TypeScript', value: 75, icon: 'assets/ts.png' },
        { title: 'Angular2-6', value: 80 },
        { title: 'React', value: 50, icon: 'assets/react-logo.png' },
        { title: 'Bootstrap', value: 60, icon: 'assets/Boostrap_logo.svg' },
        { title: 'Node.js', value: 30 },
        { title: 'LoopBack', value: 40 },
        { title: 'Elasticsearch', value: 50 },
        { title: 'Docker', value: 50 },
      ]
    },
    {
      title: '[ Playing around ]',
      subTitle: 'game development',
      icon: 'assets/dev-icon.png',
      content: '',
      color: '#fde74c',
      icons: [

      ],
      knowledge: [
        { title: 'Actionscript3', value: 10 },
        { title: 'Starling', value: 10 },
        { title: 'Adobe Flash/Animate', value: 10 },
        { title: 'Unity', value: 10 },
        { title: 'C#', value: 10 },
      ],
    },
    {
      title: '._/ Animation \_.',
      icon: 'assets/dev-icon.png',
      content: '',
      color: '#9bc53d',
      icons: [
        // { url: '' }
      ],
      knowledge: [
        { title: 'Blender', value: 10 },
        { title: 'Adobe Animate', value: 10 },
        { title: 'Adobe Photoshop', value: 10 },
        { title: 'Maya', value: 10 },
      ],
    },
    {
      title: '~ Doddle ~',
      icon: 'assets/dev-icon.png',
      content: '',
      color: '#e55934',
      icons: [
        // { url: '' }
      ], knowledge: [
        { title: 'sketch', value: 10 },
        { title: '2d animation', value: 10 },
        { title: 'Adobe Photoshop', value: 10 },
        { title: 'Adobe Animate', value: 10 },
      ],
    }
  ]
  constructor() { }

  ngOnInit() {
  }

  getAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

}
