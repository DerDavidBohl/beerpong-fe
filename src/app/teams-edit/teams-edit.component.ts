import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TeamService, TeamWithMembers } from '../team.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AthleteWithId, AthleteService } from '../athlete.service';
import { YesNoDialogComponent } from '../yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: 'app-teams-edit',
  templateUrl: './teams-edit.component.html',
  styleUrls: ['./teams-edit.component.css']
})
export class TeamsEditComponent implements OnInit, OnDestroy {
  
  subscribtions: Subscription[] = [];

  team: TeamWithMembers = {
    name: '',
    members:[]
  };
  teamId: string;
  new: boolean;
  allAthletes: AthleteWithId[] = [];

  constructor(private teamService: TeamService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
              private athleteService: AthleteService) { }
  
  ngOnInit(): void {
    this.subscribtions.push(
      this.athleteService.getAll().subscribe(
        athletes => this.allAthletes = athletes
      )
    );
    this.subscribtions.push(
      this.route.data.subscribe(data => {
        this.new = data.new;
        if (!data.new) {
          this.loadTeamFromParams();
        }
      })
    );
  }

  athleteAdd(athlete: AthleteWithId) {
    this.subscribtions.push(
      this.teamService.addMember(this.teamId, athlete.id).subscribe(() => {
        this.loadTeamFromParams();
      })
    );
  }

  athleteDelete(athlete: AthleteWithId) {
    console.log(athlete.id);
    this.subscribtions.push(
      this.teamService.deleteMember(this.teamId, athlete.id).subscribe(() => this.loadTeamFromParams())
    );
  }

  loadTeamFromParams() {
    this.subscribtions.push(
      this.route.params.subscribe(params =>
        this.loadTeamById(params.teamId)
      )
    );
  }

  loadTeamById(teamId: string): void {
    this.teamId = teamId;
    this.subscribtions.push(
      this.teamService.getSpecific(teamId).subscribe(team => this.team = team)
    );
  }
  
  ngOnDestroy(): void {
    this.subscribtions.forEach(sub => sub.unsubscribe());
  }

  create() {
    this.subscribtions.push(
      this.teamService.create({name: this.team.name}).subscribe(
        response => {
          console.log(response.headers.get('location'));
          console.log(response.status);
          console.log(response.headers.get('content-length'));
          this.router.navigate([`/teams/${response.headers.get('location')}`])
        }
        )
      );
  }

  delete() {
    const dialogRef = this.dialog.open(YesNoDialogComponent, {data: {
      header: `${this.team.name} löschen?`,
      yesText: `Löschen`,
      noText: `Nicht löschen`
    }});

    this.subscribtions.push(
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.subscribtions.push(this.teamService.delete(this.teamId).subscribe(() => {
            this.router.navigate(['/teams']);
          }));
        }
      })
    );
  }
  
  save() {
    this.subscribtions.push(
      this.teamService.save({name: this.team.name}, this.teamId)
      .subscribe(() => this.router.navigate(['/teams']))
      );
  }
}
