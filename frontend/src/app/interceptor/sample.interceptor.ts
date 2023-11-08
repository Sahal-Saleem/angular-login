import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../services/user-service.service';

@Injectable()
export class SampleInterceptor implements HttpInterceptor {

  constructor(private injector:Injector) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const userService = this.injector.get(UserService)

    const Auth = request.clone({
      setHeaders : {name:"sahal"},
    })
    return next.handle(Auth);
  }
}
