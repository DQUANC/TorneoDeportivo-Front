import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { GraphComponent } from './components/graph/graph.component';
import { UserGuard } from './guard/user.guard';
import { UserComponent } from './components/user/user.component';
import { LeagueAdminComponent } from './components/league-admin/league-admin.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { TeamComponent } from './components/team/team.component';
import { LeagueComponent } from './components/league/league.component';
import { LoginGuard } from './guard/login.guard';
import { AdminComponent } from './components/admin/admin.component';
import { UserCComponent } from './components/user-c/user-c.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'admin', canActivate:[UserGuard],component: AdminComponent,children:[
    {path: 'administracion', component: AdministracionComponent}, 
    {path: 'users', component: UserComponent},
    {path: 'leaguesAdmin', canActivate:[UserGuard], component: LeagueAdminComponent}
  ]},
  {path: 'user', canActivate:[LoginGuard],component:UserCComponent,children:[
    {path: 'graph/:idL', component: GraphComponent},
    {path: 'leagues', canActivate:[LoginGuard],component: LeagueComponent},
    {path: 'teams/:idT', canActivate:[UserGuard], component: TeamComponent}
  ]},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
