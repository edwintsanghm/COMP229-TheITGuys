import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';

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
    email:['', Validators.required],
    password:['', Validators.required],
  });

  constructor(private loginService: LoginService, private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  login():void {
    this.loginService.login(this.form.value.email, this.form.value.password).subscribe((data: any) => { 
      if(data.status != 200) 
        this.status = "Internal Server Error";
    });
  }

}
