import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  // public email:string = "";
  // public password:string = "";
  // public cpassword:string = "";
  public status:string = "";
  
  form = this.fb.group({
    email:['', Validators.required],
    password:['', Validators.required],
    cpassword:['', Validators.required],
  });


  constructor(private loginService: LoginService,private fb:FormBuilder) { }

  ngOnInit(): void {
  }

  register():void {
    if(this.form.value.password!=this.form.value.cpassword)
    {
      this.status = "Passwords do not match";
      return;
    }

    this.loginService.register(this.form.value.email, this.form.value.password).subscribe((data: any) => { 
      if(data.status != 200) 
        this.status = "Internal Server Error";
    });
  }

}
