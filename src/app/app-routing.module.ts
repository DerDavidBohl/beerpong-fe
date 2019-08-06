import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AthletesAllComponent } from './athletes-all/athletes-all.component';
import { AthleteEditComponent } from './athlete-edit/athlete-edit.component';
import { SeasonsAllComponent } from './seasons-all/seasons-all.component';
import { SeasonsEditComponent } from './seasons-edit/seasons-edit.component';

const routes: Routes = [
  //  { path: '', redirectTo: 'games', pathMatch: 'full'},
    { path: 'athletes', component: AthletesAllComponent },
    { path: 'athletes/new', component: AthleteEditComponent, data: {new: true} },
    { path: 'athletes/:athleteId', component: AthleteEditComponent, data: {new: false} },
    { path: 'seasons', component: SeasonsAllComponent},
    { path: 'seasons/new', component: SeasonsEditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
