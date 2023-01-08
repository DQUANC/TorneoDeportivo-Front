import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TeamModel } from 'src/app/models/team.model';
import { LeagueRestService } from 'src/app/services/leagueRest/league-rest.service';
import { TeamRestService } from 'src/app/services/teamRest/team-rest.service';
import Swal from 'sweetalert2';
import { MatchDayModel } from 'src/app/models/matchday.model';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  teams:any;
  team:TeamModel;
  leagues:any;
  leagueA={
    _id:'',
    name:''
  };
  idTeam: any;
  teamUpdate={
    name: '',
    points: 0,
    goalsScored: 0,
    goalsAgainst: 0,
    goalsDifference: 0,
    matchesPlayed: 0,
    league:{
      name: '',
      user: '',
    }
  }
  teamUpdated:TeamModel;
  leagueName={
    id:'',
    name:''
  };
  matchday:MatchDayModel;

  constructor(
    private teamRest: TeamRestService,
    public activatedRoute: ActivatedRoute,
    private leagueRest: LeagueRestService
  ) { 
    this.team = new TeamModel('','', 0, 0, 0, 0, 0,'','');
    this.teamUpdated = new TeamModel('','', 0, 0, 0, 0, 0,'','');
    this.matchday = new MatchDayModel(0, '',0,'',0,'','');
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe( idRuta=>{
      this.idTeam = idRuta.get('idT');
    });
    this.getTeams(this.idTeam);
    this.getLeagues();
    this.getName(this.idTeam);
  }

  addResult(addResultForm:any){
    this.teamRest.addResult(this.matchday).subscribe({
      next: (res:any)=> {
        alert(res.message)
        
        addResultForm.reset();
    },
      error: (err)=>{ alert(err.error.message || err.error)
        console.log(this.matchday.number)}
    })
  }
  createTeam(addUserForm:any){
    this.teamRest.createTeam(this.team).subscribe({
      next: (res:any)=> {
        alert(res.message)
        this.getTeams(this.idTeam);
        addUserForm.reset();
    },
      error: (err)=> alert(err.error.message || err.error)
    })
  }

  getLeague(id:string){
    this.leagueRest.getLeague(id).subscribe({
      next: (res:any)=>{this.leagueA = res},
      error: (err)=> console.log(err.error.message)
    })
  }

  getName(id:string){
    this.leagueRest.getLeague(id).subscribe({
      next: (res:any)=>{this.leagueName.id = res._id;
        this.leagueName.name = res.name},
      error: (err)=> console.log(err.error.message)
    })
  }

  getLeagues(){
    this.leagueRest.getLeagues().subscribe({
      next: (res:any)=>{this.leagues = res},
      error: (err)=> console.log(err.error.message)
    })
  }

  getTeams(id: string){
    this.teamRest.getTeams(id).subscribe({
      next: (res:any)=> this.teams = res.teams,
      error: (err)=> alert(err.error.message || err.error)
    })
  }

  getTeam(id:string){
    this.teamRest.getTeam(id).subscribe({
      next: (res:any)=>{ 
        this.teamUpdated = res;
        this.teamUpdated.id = res._id;
        this.teamUpdate.name = res.name;
        this.teamUpdate.points = res.points;
        this.teamUpdate.goalsScored = res.goalsScored;
        this.teamUpdate.goalsAgainst = res.goalsAgainst;
        this.teamUpdate.goalsDifference = res.goalsDifference;
        this.teamUpdate.matchesPlayed = res.matchesPlayed;
        this.teamUpdate.league = res.league;
      },
      error: (err)=> alert(err.error.message)
    })
  }

  updateTeam(){
    this.teamRest.updateTeam(this.teamUpdated.id, this.teamUpdate).subscribe({
      next: (res:any)=> {
        alert(res.message);
        this.getTeams(this.idTeam);
      },
      error: (err)=> alert(err.error.message || err.error)
    })
  } 

  deleteTeam(id:string){
    this.teamRest.deleteTeam(id).subscribe({
      next: (res:any)=> {
        Swal.fire({
          position: 'center',
          icon: 'success',
          showConfirmButton: false,
          timer: 2000
        });
        this.getTeams(this.idTeam);
      },
      error: (err)=> Swal.fire({
        title: err.error.message,
        position: 'center',
        icon: 'error',
        timer: 4000
      })
    })
  }
}
