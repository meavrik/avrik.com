import { Component, Input, OnInit } from "@angular/core";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";


@Component({
  selector: "app-card",
  templateUrl: "./card.component.html",
  styleUrls: ["./card.component.scss"],
})
export class CardComponent implements OnInit {
  faCoffee = faCoffee;
  @Input() card;
  constructor() {}

  ngOnInit(): void {}
}
