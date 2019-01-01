import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = { email: '', password: '' };
  loading = false;
  error = '';
  animState = "none";

  constructor() { }

  ngOnInit() {
  }

}
