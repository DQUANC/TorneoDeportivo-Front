import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { UserRestService } from './services/userRest/user-rest.service';
import { GraphComponent } from './components/graph/graph.component';
import { NgChartsModule } from 'ng2-charts';
import { UserComponent } from './components/user/user.component';
import { TeamRestService } from './services/teamRest/team-rest.service';
import { LeagueAdminComponent } from './components/league-admin/league-admin.component';
import { AdministracionComponent } from './components/administracion/administracion.component';
import { TeamComponent } from './components/team/team.component';
import { LeagueComponent } from './components/league/league.component';
import { AdminComponent } from './components/admin/admin.component';
import { UserCComponent } from './components/user-c/user-c.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    NotFoundComponent,
    GraphComponent,
    UserComponent,
    LeagueAdminComponent,
    AdministracionComponent,
    TeamComponent,
    LeagueComponent,
    AdminComponent,
    UserCComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgChartsModule
  ],
  providers: [
    UserRestService,
    TeamRestService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
