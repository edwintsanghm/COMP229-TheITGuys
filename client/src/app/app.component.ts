import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  loggedin!: boolean;

  isLoggedIn() {
    //console.log('123', localStorage.getItem('access_token'));
    if (localStorage.getItem('access_token') == null) {

      this.loggedin = false;
      return false;
    }
    else {
      this.loggedin = true;
      return true;
    }
  }

  logout() {
    localStorage.removeItem('access_token');
    this.loggedin = false;
  }
}
