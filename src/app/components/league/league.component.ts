import { Component, OnInit } from '@angular/core';
import { LeagueModel } from 'src/app/models/league.model';
import { LeagueRestService } from 'src/app/services/leagueRest/league-rest.service';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {
  leagues:any;
  league:LeagueModel;
  leagueUpdate: LeagueModel;
  updateLeague ={
    name:''
  }

  constructor(
    private leagueRest: LeagueRestService
  ) {
    this.league = new LeagueModel('', '', '');
    this.leagueUpdate = new LeagueModel('', '', '');
  }

  ngOnInit(): void {
    this.getLeagues();
  }

  getLeagues(){
    this.leagueRest.getLeagues().subscribe({
      next: (res:any)=>this.leagues = res,
      error: (err)=> console.log(err.error.message)
    })
  }

  getLeague(id:string){
    this.leagueRest.getLeague(id).subscribe({
      next: (res:any)=>{
        this.leagueUpdate = res;
        this.leagueUpdate.id = res._id;
        this.updateLeague.name = this.leagueUpdate.name;
        },
      error: (err)=> console.log(err.error.message)
    })
  }
  
  deleteLeague(id:string){
    this.leagueRest.deleteLeague(id).subscribe({
      next: (res:any)=>{
        alert(res.message);
        this.getLeagues();
      },
      error: (err)=> console.log(err.error.message)
    })
  }

  createLeague(addUserForm:any){
    this.leagueRest.createLeague(this.league).subscribe({
      next: (res:any)=> {
        alert(res.message)
        this.getLeagues()
        addUserForm.reset();
    },
      error: (err)=> alert(err.error.message || err.error)
    })
  }

  updateLeagueA(){
    this.leagueRest.updateLeague(this.leagueUpdate.id,this.updateLeague).subscribe({
      next: (res:any)=>{
        alert(res.message);
        this.getLeagues()
      },
      error: (err)=> {
      alert(err.error.message)}
    })
  }

}
