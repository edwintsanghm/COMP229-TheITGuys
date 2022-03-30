import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { FormGroup, FormControl, FormArray, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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


  constructor(private loginService: LoginService,private fb:FormBuilder, private router: Router) { }

  ngOnInit(): void {
  }

  register():void {
    if(this.form.value.password!=this.form.value.cpassword)
    {
      this.status = "Passwords do not match";
      return;
    }

    this.loginService.register(this.form.value.email, this.form.value.password).subscribe((data: any) => { 
      if(!data.user) {
        this.status = "Login Fail";
      } else {
        // redirect
        this.router.navigate(['/']);
      }
    });
  }

}
