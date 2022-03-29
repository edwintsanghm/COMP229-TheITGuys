import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public email:string = "";
  public password:string = "";
  public status:string = "";

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  login():void {
    this.loginService.login(this.email, this.password).subscribe((data: any) => { 
      if(data.status != 200) 
        this.status = "Internal Server Error";
    });
  }

}
