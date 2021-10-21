import { trigger, transition, style, animate } from "@angular/animations";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
  animations: [
    trigger('hideShow', [
      transition(':enter', [
        style({ transform: 'scale(0)' }),
        animate('150ms ease', style({ transform: 'scale(1,1.1)' })),
        animate('200ms ease-in', style({ transform: 'scale(1,1)' })),
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ transform: 'scale(0)' }))
      ])
    ])
  ]
})
export class MainComponent implements OnInit {
  @ViewChild("chart") chartRef: ElementRef;
  @ViewChild("inp", { static: true }) inp: ElementRef;

  searchStr = "";

  cards = [
    {
      title: "HTML",
      tags: ["web", "mobile", "frontend", "fullstack"],
      level: 1,
    },
    {
      title: "CSS",
      tags: ["web", "mobile", "frontend", "fullstack"],
      level: 1,
    },
    {
      title: "Java Script",
      icon: "js",
      tags: ["web", "mobile", "frontend", "fullstack"],
      level: 1,
    },
    {
      title: "Ionic",
      tags: ["mobile", "frontend", "fullstack"],
      level: 1,
    },
    {
      title: "Angular",
      tags: ["web", "frontend", "fullstack", 'framework'],
      level: 1,
    },
    {
      title: "React",
      tags: ["web", "frontend", "fullstack", 'framework'],
      level: 1,
    },
    {
      title: "NodeJs",
      icon: "html",
      tags: ["web", "backend", "fullstack"],
      level: 2,
    },
    {
      title: "Git",
      icon: "html",
      tags: ["development tools", "source control"],
      level: 0,
    },
    {
      title: "Docker",
      icon: "html",
      tags: ["development tools", "containers", 'framework'],
      level: 0,
    },
    {
      title: "NestJS",
      icon: "html",
      tags: ["web", "backend", "fullstack"],
      level: 2,
    },
    {
      title: "Loop back",
      icon: "html",
      tags: ["web", "backend", "fullstack", 'framework'],
      level: 2,
    },
    {
      title: "MongoDB",
      icon: "html",
      tags: ["web", "backend", "db"],
      level: 2,
    },
    {
      title: "ElasticSearch",
      icon: "html",
      tags: ["web", "backend", "db"],
      level: 2,
    },
    {
      title: "Figma",
      icon: "html",
      tags: ["frontend", "ui", "ux"],
      level: 1,
    },
    {
      title: "Adobe XD",
      icon: "html",
      tags: ["frontend", "ui", "ux"],
      level: 1,
    },
    {
      title: "Adobe Photoshop",
      icon: "photoshop",
      tags: ["design", "ui", "ux", "sketch"],
      level: 1,
    },
    {
      title: "Jenkins",
      icon: "photoshop",
      tags: ["devops"],
      level: 4,
    },
    {
      title: "Google cloud",
      icon: "photoshop",
      tags: ["devops"],
      level: 4,
    },
    {
      title: "RxJS",
      icon: "photoshop",
      tags: ["library", 'state managment'],
      level: 1,
    },
    {
      title: "Redux",
      icon: "photoshop",
      tags: ["library", 'state managment'],
      level: 1,
    },
    {
      title: "ChartJS",
      icon: "photoshop",
      tags: ["library", 'charts', 'ui'],
      level: 1,
    },
    {
      title: "Postman",
      icon: "photoshop",
      tags: ['development tools'],
      level: 3,
    },
    {
      title: "npm",
      icon: "photoshop",
      tags: ['development tools'],
      level: 1,
    },
    {
      title: "ExpressJS",
      icon: "photoshop",
      tags: ['backend', 'fullstack'],
      level: 1,
    },
    {
      title: "D3",
      icon: "photoshop",
      tags: ['library', 'frontend', 'ui', 'charts'],
      level: 1,
    },
  ];
  filteredCards = [...this.cards];

  constructor() { }

  ngOnInit() { }

  onInputChange(event) {
    this.filteredCards = this.cards.filter(
      (c) =>
        c.title.toLowerCase().indexOf(this.searchStr.toLowerCase()) !== -1 ||
        c.tags.some(
          (tag) =>
            tag.toLowerCase().indexOf(this.searchStr.toLowerCase()) !== -1
        )
    );
    /* this.suggestionsArr = this.searchStr
      ? this.completeArr.filter((a) => a.indexOf(this.searchStr) !== -1)
      : []; */
  }

  onSlider(num) {
    console.log('aa', event);
    this.filteredCards = this.cards.filter(c => c.level <= num)
  }
}
