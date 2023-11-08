import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/User';
import { UserService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  form !: FormGroup; 
  errorMessage : string =''

  constructor( 
    private formBuilder : FormBuilder,
    private http : HttpClient,
    private router : Router,
    private userService : UserService
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: new FormControl(null, [Validators.required, Validators.maxLength(30)]),
      email : new FormControl(null, [Validators.required, Validators.email, Validators.pattern("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$")]),
      password : new FormControl(null, [Validators.required, Validators.maxLength(8), Validators.minLength(8)])
    })
  }

  onFormSubmit(){
    console.log(this.form);
    
    if(this.form.valid){
      const user : User ={
        name : this.form.value.name,
        email : this.form.value.email,
        password : this.form.value.password
      }
      console.log(user);
      
      this.userService.signup(user).subscribe({
        next: (response) => {
          this.router.navigateByUrl('/login');
        },
        error: (error: HttpErrorResponse) => {
            this.errorMessage = error.error;
        }
      });
    }
    setTimeout(() => this.errorMessage = '',3000);
  }
}
