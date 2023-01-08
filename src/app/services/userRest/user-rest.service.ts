import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {
  httpOptions = new HttpHeaders({'Content-Type': 'application/json',
  'Authorization': this.getToken()});

  constructor(private http: HttpClient) { }

  register(params:{}){
    return this.http.post(environment.baseUrl + 'user/register', params, {headers: this.httpOptions});
  }

  login(params:{}){
    return this.http.post(environment.baseUrl +  'user/login', params, {headers: this.httpOptions});
  }

  getToken(){
    let globalToken = localStorage.getItem('token');
    let token;
    if(globalToken != undefined){
      token = globalToken;
    }else{
      token = '';
    }
    return token;
  }

  getIdentity(){
    let globalIdentity = localStorage.getItem('identity');
    let identity;
    if(globalIdentity != undefined){
      identity = JSON.parse(globalIdentity);
    }else{
      identity = '';
    }
    return identity;
  }

  //RUTAS PARA ADMIN
  
  getClients(){
    return this.http.get(environment.baseUrl + 'user/getClients', {headers: this.httpOptions})
  }

  getClient(id:string){
    return this.http.get(environment.baseUrl + 'user/getClient/' + id, {headers: this.httpOptions})
  }

  deleteClient(id:string){
    return this.http.delete(environment.baseUrl+ 'user/deleteClient/' + id, {headers: this.httpOptions})
  }

  createAdmin(params:{}){
    return this.http.post(environment.baseUrl+ 'user/createAdmin',params, {headers: this.httpOptions})
  }

  updateClient(id:string,params:{}){
    return this.http.put(environment.baseUrl + 'user/updateClient/'+id, params, {headers: this.httpOptions})
  }
}
