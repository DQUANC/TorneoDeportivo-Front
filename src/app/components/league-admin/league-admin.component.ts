import { Component, OnInit } from '@angular/core';
import { LeagueModel } from 'src/app/models/league.model';
import { LeagueRestService } from 'src/app/services/leagueRest/league-rest.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-league-admin',
  templateUrl: './league-admin.component.html',
  styleUrls: ['./league-admin.component.css']
})
export class LeagueAdminComponent implements OnInit {
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
    this.obtainLeagues();
  }

  obtainLeagues(){
    this.leagueRest.obtainLeagues().subscribe({
      next: (res:any)=>this.leagues = res,
      error: (err)=> console.log(err.error.message)
    })
  }

  obtainLeague(id:string){
    this.leagueRest.obtainLeague(id).subscribe({
      next: (res:any)=>{
        this.leagueUpdate = res;
        this.leagueUpdate.id = res._id;
        this.updateLeague.name = this.leagueUpdate.name;
        },
      error: (err)=> console.log(err.error.message)
    })
  }
  
  removeLeague(id:string){
    this.leagueRest.removeLeague(id).subscribe({
      next: (res:any)=>{
        alert(res.message);
        this.obtainLeagues();
      },
      error: (err)=> console.log(err.error.message)
    })
  }

  saveLeague(addUserForm:any){
    this.leagueRest.saveLeague(this.league).subscribe({
      next: (res:any)=> {
        alert(res.message)
        this.obtainLeagues()
        addUserForm.reset();
    },
      error: (err)=> alert(err.error.message || err.error)
    })
  }

  editLeague(){
    this.leagueRest.editLeague(this.leagueUpdate.id,this.updateLeague).subscribe({
      next: (res:any)=>{
        alert(res.message);
        this.obtainLeagues()
      },
      error: (err)=> {
      alert(err.error.message)}
    })
  }

}
