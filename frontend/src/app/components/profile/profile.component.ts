import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/User';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  imageUrl: string  =  '../../../assets/default-avatar.png';
  user : any
  name : string =''
  email :string = ''
   
  constructor( private router : Router, private userService : UserService){}

  ngOnInit(): void {
      this.userService.getUser().subscribe((user)=>{
        this.user = user
        this.email = this.user.email
        this.name = this.user.name
        if(this.user.image){
          this.imageUrl= this.user.image
        }
      })
      
  }
}
