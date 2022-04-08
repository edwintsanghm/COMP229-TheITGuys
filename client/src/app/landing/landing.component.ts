import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor() { }
  isLogin = false
  ngOnInit(): void {
    if (localStorage.getItem('access_token')) {
      this.isLogin=true
    }else {
      this.isLogin=false
    }
  }
  isLogined():boolean{
    if (localStorage.getItem('access_token')) {
      return true
    }
    return false
  }
}
