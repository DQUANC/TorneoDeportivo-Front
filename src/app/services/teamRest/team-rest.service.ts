import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserRestService } from '../userRest/user-rest.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TeamRestService {
  httpOptions = new HttpHeaders({
    'Content-type': 'application/json',
    'Authorization': this.userRest.getToken()
  });

  constructor(
    private http: HttpClient,
    private userRest: UserRestService
  ) { }

  getTeams(id:string){
    return this.http.get(environment.baseUrl + 'team/getTeams/' + id, {headers: this.httpOptions})
  }
  createTeam(params:{}){
    return this.http.post(environment.baseUrl + 'team/createTeam/',params, {headers: this.httpOptions});
  }
  
  getTeam(id:string){
    return this.http.get(environment.baseUrl + 'team/getTeam/' + id, {headers: this.httpOptions});
  }

  updateTeam(id:string, params:{}){
    return this.http.put(environment.baseUrl + 'team/updateTeam/' + id, params, {headers: this.httpOptions});
  }

  deleteTeam(id:string){
    return this.http.delete(environment.baseUrl + 'team/deleteTeam/' + id, {headers: this.httpOptions});
  }

  addResult(params:{}){
    return this.http.post(environment.baseUrl + 'matchDay/addResult', params,{headers: this.httpOptions})
  }
}
