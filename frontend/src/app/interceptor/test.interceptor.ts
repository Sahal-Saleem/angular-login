import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs';

@Injectable()
export class TestInterceptor implements HttpInterceptor {
 

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const startTime = (new Date()).getTime()
    return next.handle(request).pipe(
      
      map(event =>{
     
        const endTime = (new Date()).getTime()
        const difference = startTime - endTime
        console.log('suceed in'+difference +'milliseconds');
        
        return event 
        
      })
    );
  }
}
