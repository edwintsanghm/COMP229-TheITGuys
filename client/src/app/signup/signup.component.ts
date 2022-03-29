import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public email:string = "";
  public password:string = "";
  public cpassword:string = "";
  public status:string = "";

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  register():void {
    if(this.password!=this.cpassword)
    {
      this.status = "Passwords do not match";
      return;
    }

    this.loginService.register(this.email, this.password).subscribe((data: any) => { 
      if(data.status != 200) 
        this.status = "Internal Server Error";
    });
  }

}
