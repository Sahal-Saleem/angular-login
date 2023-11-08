import { Injectable } from "@angular/core";
import { CanActivate, Router} from "@angular/router";
import { UserService } from "../services/user-service.service";

@Injectable({
    providedIn : 'root'
})

export class UserAuthGuard implements CanActivate{

    constructor( public router : Router, private userService : UserService){}
    canActivate() {
        if(this.userService.getToken()){
            return true
        } else{
            this.router.navigate(['login'])
            return false
        }
    }
}