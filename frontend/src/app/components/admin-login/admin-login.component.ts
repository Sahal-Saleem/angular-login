import { HttpErrorResponse } from '@angular/common/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { User } from 'src/app/User';
import { UserService } from 'src/app/services/user-service.service';
import { loginRequest } from 'src/app/state/login.action';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
  
})
export class AdminLoginComponent {
  
  form !: FormGroup;
  errorMessage : string =''
  
  constructor(private formBuilder : FormBuilder , 
    private userService : UserService,
    private router : Router,
    private store : Store ){}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email : new FormControl(null, [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$")]),
      password : new FormControl(null, [Validators.required, Validators.maxLength(8), Validators.minLength(8)])
    })
  }

  onFormSubmit(){

    console.log(this.form);

    if(this.form.valid){
      console.log(this.form.value);
      
        if(this.form.value.email != 'admin@a.com'){
          console.log("Wrong Email"); 
          this.errorMessage =  "Wrong Email"
        }
        if(this.form.value.password != '11111111'){
          console.log("Wrong Password");
          this.errorMessage =  "wrong password"
        }

        window.sessionStorage.setItem('admin','true')
        this.router.navigateByUrl('/adminHome')
 
    }
    setTimeout(() => this.errorMessage = '',3000);
  } 

}
