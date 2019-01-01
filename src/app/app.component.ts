import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  onPage = 1;

  pause = false;
  lastScrollTop
  constructor(private router: Router) {
    /* window.onscroll = (e) => {

      if (!this.pause) {

        this.pause = true;

        const st = window.pageYOffset || document.documentElement.scrollTop;


        if (st > this.lastScrollTop) {
          if (this.onPage < 2) {
            console.log('scroll down');
            this.onPage++;

            this.router.navigateByUrl('/page' + this.onPage);
          }
        } else {
          if (this.onPage > 1) {

            console.log('scroll up');
            this.onPage--;
            this.router.navigateByUrl('/page' + this.onPage);
          }

        }

        this.lastScrollTop = st <= 0 ? 0 : st; 

        setTimeout(() => {
          this.pause = false;
        }, 1000);
      }

    }; */
  }
}


