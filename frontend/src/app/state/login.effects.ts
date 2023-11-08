import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { UserService } from "../services/user-service.service";
import { loginFailure, loginRequest, loginSuccess } from "./login.action";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { of } from "rxjs";
import { Router } from "@angular/router";

@Injectable()

export class AuthEffects{

    constructor( private actions$ : Actions, 
        private userService : UserService,
        private router : Router){}

    login$ = createEffect(()=>
        this.actions$.pipe(
            ofType(loginRequest),
            switchMap(({ credentials }) =>
                this.userService.login(credentials).pipe(
                    map(res=>{
                        let responce : any = res;
                        if(responce){
                            sessionStorage.setItem('token',responce[1])
                            console.log('in side effect',responce[0]);
                            this.userService.user = responce[0]
                            return loginSuccess({ user : responce[0], token : responce[1]})
                        }else{
                            return loginFailure({ error : responce  })
                        }
                    }),
                    catchError(error => of (loginFailure({ error })))
                )
            )
        )
    );

    loginSuccess$ = createEffect(()=>
        this.actions$.pipe(
            ofType(loginSuccess),
            tap(()=>{
                this.router.navigate(['/']);
            })
        ), {
            dispatch : false
        }
    );

    loginFailure$ = createEffect(()=>
        this.actions$.pipe(
            ofType(loginFailure),
            tap(()=>{
                this.router.navigate(['/login'])
            })
        ), {
            dispatch: false
        }
    );
}