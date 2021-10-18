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
  data
  constructor() {}

  ngOnInit() {
    var ctx = document.getElementById("myChart");
    setTimeout(() => {
      this.data = {
        datasets: [
          {
            data: [10, 20, 30],
          },
        ],

        // These labels appear in the legend and in the tooltips when hovering different arcs
        labels: ["Red", "Yellow", "Blue"],
      };
    }, 10);
  }

  onInputChange(event) {
    this.suggestionsArr = this.searchStr
      ? this.completeArr.filter((a) => a.indexOf(this.searchStr) !== -1)
      : [];
  }
}
