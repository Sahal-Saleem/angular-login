import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/User';
import { UserService } from 'src/app/services/user-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { loginRequest } from 'src/app/state/login.action';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

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

  get r() {
    return this.form.controls
  }


  onFormSubmit(){
    console.log(this.form);
    
    if(this.form.valid){
      const user : User ={
        email : this.form.value.email,
        password : this.form.value.password
      }
      console.log(user);
      
      this.store.dispatch(loginRequest({credentials : { email: user.email , password : user.password}}))
      // this.userService.login(user).subscribe({
      //   next : (response:any)=>{
      //     console.log(response[1]);
      //     this.userService.setToken(response[1])
      //     this.router.navigateByUrl('/');
      //   },
      //   error: (error : HttpErrorResponse)=>{
      //     this.errorMessage = error.error; 
      //   }
      // })
    }
    setTimeout(() => this.errorMessage = '',3000);
  } 
}
