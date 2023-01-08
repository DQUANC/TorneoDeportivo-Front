import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UserRestService } from '../userRest/user-rest.service';

@Injectable({
  providedIn: 'root'
})
export class LeagueRestService {
  httpOptions = new HttpHeaders({
    'Content-type': 'application/json',
    'Authorization': this.userRest.getToken()
  })

  constructor(
    private http:HttpClient,
    private userRest: UserRestService
  ) { }

  obtainLeagues(){
    return this.http.get(environment.baseUrl + 'league/obtainLeagues', {headers:this.httpOptions})
  }
  
  obtainLeague(id:string){
    return this.http.get(environment.baseUrl + 'league/obtainLeague/' + id, {headers:this.httpOptions})
  }

  getLeagues(){
    return this.http.get(environment.baseUrl + 'league/getLeagues/', {headers:this.httpOptions})
  }

  getLeague(id:string){
    return this.http.get(environment.baseUrl + 'league/getLeague/'+ id, {headers:this.httpOptions})
  }

  saveLeague(params:{}){
    return this.http.post(environment.baseUrl + 'league/saveLeague', params, {headers:this.httpOptions})
  }

  editLeague(id:string,params:{}){
    return this.http.put(environment.baseUrl + 'league/editLeague/' + id, params, {headers: this.httpOptions})
  }

  removeLeague(id:string){
    return this.http.delete(environment.baseUrl + 'league/removeLeague/' +id, {headers:this.httpOptions})
  }

  createLeague(params:{}){
    return this.http.post(environment.baseUrl + 'league/createLeague', params, {headers:this.httpOptions})
  }

  updateLeague(id:string,params:{}){
    return this.http.put(environment.baseUrl + 'league/updateLeague/' + id, params, {headers: this.httpOptions})
  }

  deleteLeague(id:string){
    return this.http.delete(environment.baseUrl + 'league/deleteLeague/' +id, {headers:this.httpOptions})
  }
}
