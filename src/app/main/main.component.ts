import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
})
export class MainComponent implements OnInit {
  currentFocus;
  @ViewChild("chart") chartRef: ElementRef;
  @ViewChild("inp", { static: true }) inp: ElementRef;

  completeArr = [
    "About",
    "contact",
    "history",
    "what",
    "who",
    "why",
    "story",
    "portfolio",
  ];
  suggestionsArr = [];
  searchStr = "";

  cards = [
    {
      title: "HTML",
      icon: "html",
      tags: ["web", "mobile", "frontend", "fullstack"],
    },
    {
      title: "CSS",
      icon: "css",
      tags: ["web", "mobile", "frontend", "fullstack"],
    },
    {
      title: "Java Script",
      icon: "js",
      tags: ["web", "mobile", "frontend", "fullstack"],
    },
    {
      title: "Ionic",
      icon: "ionic",
      tags: ["mobile", "frontend", "fullstack"],
    },
    {
      title: "Angular",
      icon: "angular",
      tags: ["web", "frontend", "fullstack"],
    },
    {
      title: "React",
      icon: "react",
      tags: ["web", "frontend", "fullstack"],
    },
    {
      title: "NodeJs",
      icon: "html",
      tags: ["web", "backend", "fullstack"],
    },
    {
      title: "Git",
      icon: "html",
      tags: ["development tools", "source control"],
    },
    {
      title: "Docker",
      icon: "html",
      tags: ["development tools", "containerss"],
    },
    {
      title: "NestJS",
      icon: "html",
      tags: ["web", "backend", "fullstack"],
    },
    {
      title: "MongoDB",
      icon: "html",
      tags: ["web", "backend", "db"],
    },
    {
      title: "ElasticSearch",
      icon: "html",
      tags: ["web", "backend", "db"],
    },
    {
      title: "Figma",
      icon: "html",
      tags: ["frontend", "ui", "ux"],
    },
    {
      title: "Adobe XD",
      icon: "html",
      tags: ["frontend", "ui", "ux"],
    },
    {
      title: "Adobe Photoshop",
      icon: "photoshop",
      tags: ["design", "ui", "ux", "sketch"],
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
}
