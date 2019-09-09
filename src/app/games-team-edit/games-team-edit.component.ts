import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { TeamWithId } from '../team.service';
import { AthleteWithId } from '../athlete.service';
import { ItemListComponent } from '../item-list/item-list.component';

@Component({
  selector: 'app-games-team-edit',
  templateUrl: './games-team-edit.component.html',
  styleUrls: ['./games-team-edit.component.css']
})
export class GamesTeamEditComponent implements OnInit {
  _score: number;
  get score(): number {return this._score;}
  @Input()
  set score(score: number) {
    this._score = score
    this.scoreChange.emit(this.score);
  }
  @Output() scoreChange = new EventEmitter<number>();

  _team: TeamWithId;
  get team(): TeamWithId {return this._team;}
  @Input()
  set team(team: TeamWithId) {
    this._team = team;
    this.teamChange.emit(this.team);
  }
  @Output() teamChange = new EventEmitter<TeamWithId>();

  _athletes: AthleteWithId[] = [];
  get athletes(): AthleteWithId[] {return this._athletes;}
  @Input() 
  set athletes(athletes: AthleteWithId[]) {
    this._athletes = athletes;
    this.athletesChange.emit(this.athletes);
  }
  @Output() athletesChange = new EventEmitter<AthleteWithId[]>();

  @Input()  allAthletes: AthleteWithId[];
  @Input()  allTeams: TeamWithId[];

  @ViewChild('addedAthletes', {static: false}) addedAthletes: ItemListComponent;

  constructor() { }

  ngOnInit() {
  }

  deleteAthleteFromTeam(athlete) {
    this.athletes = this.athletes.filter(el => {
      return el !== athlete
    });
  }

  addAthleteToTeam(athlete) {

    if(!this.athletes.includes(athlete)) {
      this.athletes.push(athlete);
      this.athletes = this.athletes.slice();
      // this.addedAthletes.refresh();
    }

    
  }

}
