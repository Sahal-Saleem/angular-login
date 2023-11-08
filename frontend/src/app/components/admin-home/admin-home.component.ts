import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],

})
export class AdminHomeComponent implements OnInit {
  search: FormControl
  users$: any
  searchKey: any
  constructor(private router: Router, private userService: UserService) {
    this.search = new FormControl('')
  }

ngOnInit(): void {
  this.users$ = this.userService.getAllUsers();
  
  this.search.valueChanges.subscribe((searchKey: string) => {
    if (searchKey) {
      this.users$ = this.userService.getSearchUsers(searchKey)
    } else {
      this.users$ = this.userService.getAllUsers();
    }
  });
}

  logout() {
    window.sessionStorage.removeItem('admin')
    this.userService.deleteToken()
    this.router.navigateByUrl('adminLogin')
  }

  getUsers() {
    this.users$ = this.userService.getAllUsers()
  }

  removeUser(userId: string) { 
    console.log('delete');
    
    this.userService.delete(userId).subscribe(
      (response) => {
        this.getUsers()
      }
    )
  }

}
