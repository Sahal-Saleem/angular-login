import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../User';
import { environment } from '../../environments/environment'


@Injectable({
  providedIn: 'root'
})
export class UserService {

  user : any;
  
  constructor( private http : HttpClient) { }

  signup(user : User){
    console.log("sign");
    
    return this.http.post(`${environment.apiUrl}/user/signup`, user)
  }

  login(user : User){
    return this.http.post(`${environment.apiUrl}/user/login`,user)
  }

  setToken(token : string){
    return window.sessionStorage.setItem('token',token)
  }

  getToken(){
    return window.sessionStorage.getItem('token')
  }

  deleteToken(){
    return window.sessionStorage.removeItem('token')
  }

  getData(){
    return 
  }

  getUser(){
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/json')
        .set('Authorization', 'Bearer ' + this.getToken());
      console.log("get user service", headers);
      
    return this.http.get(`${environment.apiUrl}/user/get-user`,{headers})
  }

  update(user : any){
    return  this.http.put(`${environment.apiUrl}/user/login`,user)
  }

  delete(id: string) {
    console.log(id);
    
    return this.http.post(`${environment.apiUrl}/user/delete`,{id})
  }

  getAllUsers(){
    return this.http.get(`${environment.apiUrl}/admin/users`)
  }
  getSearchUsers(key: string){
    return this.http.get(`${environment.apiUrl}/admin/search?searchKey=${key}`)
  }

 
}
