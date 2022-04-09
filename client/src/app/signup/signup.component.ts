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
  public status:string = "";
  
  form = this.fb.group({
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.minLength(4)]],
    cpassword:['', [Validators.required, Validators.minLength(4)]],
  },{
    validator: this.ConfirmedValidator('password', 'cpassword')  
  });

  ConfirmedValidator(controlName: string, matchingControlName: string){
    return (formGroup: FormGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors['confirmedValidator']) {
            return;
        }
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }
    }
  }

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
      console.log(data.error.errors.email)
      if(!data.user) {
        if(data.error?.errors?.email) {
          this.status = "Signup failed. Email is already taken";
        } else {
          this.status = "Signup failed.";
        }
      } else {
        // redirect
        this.router.navigate(['/']);
      }
    });
  }
}

