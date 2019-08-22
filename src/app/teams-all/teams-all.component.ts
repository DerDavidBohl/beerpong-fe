import { Component, OnInit } from '@angular/core';
import { TeamService, TeamWithId } from '../team.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-teams-all',
  templateUrl: './teams-all.component.html',
  styleUrls: ['./teams-all.component.css']
})
export class TeamsAllComponent implements OnInit {

  teams: TeamWithId[];

  constructor(private teamService: TeamService,
              private router: Router) { }

  ngOnInit() {
    this.teamService.getAll().subscribe(teams => {
      this.teams = teams;
    });
  }

  teamSelected(team: TeamWithId) {
    this.router.navigate([`/teams/${team.id}`]);
  }

}
