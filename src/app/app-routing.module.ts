import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AthletesAllComponent } from './athletes-all/athletes-all.component';
import { AthleteEditComponent } from './athlete-edit/athlete-edit.component';
import { SeasonsAllComponent } from './seasons-all/seasons-all.component';
import { SeasonsEditComponent } from './seasons-edit/seasons-edit.component';
import { TeamsAllComponent } from './teams-all/teams-all.component';
import { TeamsEditComponent } from './teams-edit/teams-edit.component';
import { GamesEditComponent } from './games-edit/games-edit.component';
import { GamesAllComponent } from './games-all/games-all.component';
import { RankingAthleteComponent } from './ranking-athletes/ranking-athletes.component';
import { RankingTeamComponent } from './ranking-teams/ranking-teams.component';

const routes: Routes = [
  //  { path: '', redirectTo: 'games', pathMatch: 'full'},
    { path: 'athletes', component: AthletesAllComponent },
    { path: 'athletes/new', component: AthleteEditComponent, data: {new: true} },
    { path: 'athletes/:athleteId', component: AthleteEditComponent, data: {new: false} },
    { path: 'seasons', component: SeasonsAllComponent},
    { path: 'seasons/new', component: SeasonsEditComponent, data: {new: true}},
    { path: 'seasons/:seasonId', component: SeasonsEditComponent, data: {new: false}},
    { path: 'teams', component: TeamsAllComponent},
    { path: 'teams/new', component: TeamsEditComponent, data: {new: true}},
    { path: 'teams/:teamId', component: TeamsEditComponent, data: {new: false}},
    { path: 'games/new', component: GamesEditComponent, data: {new: true}},
    { path: 'games/:gameId', component: GamesEditComponent, data: {new: false}},
    { path: 'games', component: GamesAllComponent},
    { path: 'ranking/athletes', component: RankingAthleteComponent},
    { path: 'ranking/teams', component: RankingTeamComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
