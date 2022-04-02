import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  // public email:string = "";
  // public password:string = "";
  public status:string = "";

  form = this.fb.group({
    username:['', Validators.required],
    password:['', Validators.required],
  });

  constructor(private loginService: LoginService, private fb:FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  login():void {
    this.loginService.login(this.form.value.username, this.form.value.password).subscribe((data: any) => { 
      console.log("try Login");
      this.status = 'Testing'
      if(!data.user) {
        this.status = "Login Fail";
        console.log(this.status);
      } else {
        // redirect
        console.log('login success')
        this.router.navigate(['/']);
      }
    });
  }

}
