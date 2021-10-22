import { trigger, transition, style, animate } from "@angular/animations";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
  animations: [
    trigger("hideShow", [
      transition(":enter", [
        style({ transform: "scale(0)" }),
        animate("150ms ease", style({ transform: "scale(1,1.1)" })),
        animate("200ms ease-in", style({ transform: "scale(1,1)" })),
      ]),
      transition(":leave", [
        animate("200ms ease-in", style({ transform: "scale(0)" })),
      ]),
    ]),
  ],
})
export class MainComponent implements OnInit {
  @ViewChild("chart") chartRef: ElementRef;
  @ViewChild("inp", { static: true }) inp: ElementRef;

  searchStr = "";

  cards = [
    {
      title: "HTML",
      icon: "html5-svgrepo-com",
      tags: ["web", "frontend"],
      level: 1,
    },
    {
      title: "CSS",
      icon: "logo-css3-svgrepo-com",
      tags: ["web", "mobile", "frontend"],
      level: 1,
    },
    {
      title: "SASS",
      icon: "sass-svgrepo-com",
      tags: ["web", "mobile", "frontend"],
      level: 1,
    },
    {
      title: "Java Script",
      icon: "logo-javascript-svgrepo-com",
      tags: ["web", "mobile", "frontend"],
      level: 1,
    },
    {
      title: "Type Script",
      icon: "typescript-svgrepo-com",
      tags: ["web", "mobile", "backend", "frontend"],
      level: 1,
    },
    {
      title: "Webpack",
      icon: "webpack-svgrepo-com",
      tags: ["web", "frontend"],
      level: 1,
    },
    {
      title: "Ionic",
      icon: "ionic-svgrepo-com",
      tags: ["mobile", "frontend"],
      level: 1,
    },
    {
      title: "Angular",
      icon: "angular-svgrepo-com",
      tags: ["web", "frontend", "framework"],
      level: 1,
    },
    {
      title: "React",
      icon: "react-svgrepo-com",
      tags: ["web", "frontend", "framework"],
      level: 1,
    },
    {
      title: "NodeJs",
      icon: "node-js-svgrepo-com",
      tags: ["web", "backend", "fullstack"],
      level: 2,
    },
    {
      title: "Git",
      icon: "github-svgrepo-com",
      tags: ["development tools", "source control"],
      level: 1,
    },
    {
      title: "Docker",
      icon: "docker-svgrepo-com",
      tags: ["development tools", "containers"],
      level: 1,
    },
    {
      title: "NestJS",
      icon: "nestjs-svgrepo-com",
      tags: ["web", "backend", "fullstack"],
      level: 2,
    },
    {
      title: "Loop back",
      icon: "loopback-icon-svgrepo-com",
      tags: ["web", "backend", "fullstack", "framework"],
      level: 2,
    },
    {
      title: "MongoDB",
      icon: "mongodb-svgrepo-com",
      tags: ["web", "backend", "db"],
      level: 2,
    },
    {
      title: "ElasticSearch",
      icon: "elasticsearch-svgrepo-com",
      tags: ["web", "backend", "db"],
      level: 2,
    },
    {
      title: "Figma",
      icon: "figma-svgrepo-com",
      tags: ["frontend", "ui", "ux", "design"],
      level: 0,
    },
    {
      title: "Adobe XD",
      icon: "adobe-xd-logo-svgrepo-com",
      tags: ["frontend", "ui", "ux", "design"],
      level: 0,
    },
    {
      title: "Photoshop",
      icon: "adobe-photoshop-svgrepo-com",
      tags: ["ui", "ux", "design"],
      level: 0,
    },
    {
      title: "Jenkins",
      icon: "jenkins-svgrepo-com",
      tags: ["devops"],
      level: 4,
    },
    {
      title: "Google cloud",
      icon: "google-cloud-svgrepo-com",
      tags: ["devops"],
      level: 4,
    },
    {
      title: "RxJS",
      icon: "rxjs",
      tags: ["frontend", "library", "state managment"],
      level: 1,
    },
    {
      title: "Redux",
      icon: "redux-svgrepo-com",
      tags: ["frontend", "library", "state managment"],
      level: 1,
    },
    {
      title: "ChartJS",
      icon: "chartjs-logo",
      tags: ["frontend", "library", "charts", "ui"],
      level: 1,
    },
    {
      title: "Postman",
      icon: "postman-svgrepo-com",
      tags: ["development tools", "api"],
      level: 3,
    },
    {
      title: "Swagger",
      icon: "swagger-svgrepo-com",
      tags: ["development tools", "api"],
      level: 3,
    },
    {
      title: "npm",
      icon: "logo-npm-svgrepo-com",
      tags: ["development tools"],
      level: 1,
    },
    /*   {
      title: "ExpressJS",
      icon: "photoshop",
      tags: ['backend', 'fullstack'],
      level: 1,
    }, */
    {
      title: "D3",
      icon: "d3-js-svgrepo-com",
      tags: ["library", "frontend", "ui", "charts"],
      level: 1,
    },
  ];
  filteredCards = [...this.cards];

  constructor() {}

  ngOnInit() {}

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

  onCardClick(card) {
    window.open(`https://www.google.com/search?q=${card.title}`);
  }
  onSlider(num) {
    this.filteredCards = this.cards.filter((c) => c.level <= num);
  }
}
