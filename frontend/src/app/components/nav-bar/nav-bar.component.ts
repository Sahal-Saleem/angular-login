import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  title : string = 'Log Me IN'

  constructor( private userService : UserService, private router : Router){}
  
  isLoggedIn(): boolean {
    if(this.userService.getToken())
      return true
    else return false
  }

  logout(){
    this.userService.deleteToken();
    this.router.navigateByUrl('')
  }
}
