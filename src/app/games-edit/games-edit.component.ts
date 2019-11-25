import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  NgZone,
  ApplicationRef,
  ViewChild
} from "@angular/core";
import { FormGroup, Validators, FormBuilder, FormControl } from "@angular/forms";
import { Game, GameService } from "../game.service";
import { TeamService, TeamWithId } from "../team.service";
import { Subscription, Observable } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { AthleteWithId, AthleteService } from "../athlete.service";
import { ItemListComponent } from "../item-list/item-list.component";
import { SeasonService, SeasonWithId } from '../season.service';
import { startWith, map } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { YesNoDialogComponent } from '../yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: "app-games-edit",
  templateUrl: "./games-edit.component.html",
  styleUrls: ["./games-edit.component.css"]
})
export class GamesEditComponent implements OnInit, OnDestroy {
  subscribtions: Subscription[] = [];

  new = false;

  game: Game = {
    date: new Date(),
    remainingCupsTeam1: 0,
    remainingCupsTeam2: 0,
    season: null,
    team1: null,
    team2: null,
    athletesTeam1: [],
    athletesTeam2: []
  };

  allTeams: TeamWithId[] = [];
  allAthletes: AthleteWithId[] = [];
  gameId: string;

  allSeasons: SeasonWithId[];
  seasonCtrl = new FormControl();
  filteredSeasons: Observable<SeasonWithId[]>;

  constructor(
    private teamService: TeamService,
    private athleteService: AthleteService,
    private route: ActivatedRoute,
    private gameService: GameService,
    private router: Router,
    private seasonService: SeasonService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.subscribtions.push(
      this.route.data.subscribe(data => {
        this.new = data.new;
        if (!this.new) {
          this.loadGameFromParams();
        }
      })
    );

    this.subscribtions.push(
      this.teamService.getAll().subscribe(teams => (this.allTeams = teams))
    );
    this.subscribtions.push(
      this.athleteService
        .getAll()
        .subscribe(athletes => (this.allAthletes = athletes))
    );

    this.seasonService.getAll().subscribe(seasons => {
      this.allSeasons = seasons;
      
      this.filteredSeasons = this.seasonCtrl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(state => state ? this._filterSeasons(state) : this.allSeasons.slice())
      );
    });
  }

  private _filterSeasons(value: string): SeasonWithId[] {
    const filterValue = value.toLowerCase();

    return this.allSeasons.filter(season => season.name.toLowerCase().indexOf(filterValue) === 0);
  }

  loadGameFromParams() {
    this.subscribtions.push(
      this.route.params.subscribe(params => this.loadGameById(params.gameId))
    );
  }

  loadGameById(gameId: string): void {
    this.gameId = gameId;
    this.subscribtions.push(
      this.gameService.getSpecific(this.gameId).subscribe(game => {
        this.game = game;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscribtions.forEach(sub => sub.unsubscribe());
  }

  create() {
    this.subscribtions.push(
      this.gameService.create(this.game).subscribe(() => {
        this.router.navigateByUrl('/games');
      })
      );
    }
    
    save() {
      this.subscribtions.push(
        this.gameService.save(this.game, this.gameId).subscribe(() => {
          this.router.navigateByUrl('/games');
      })
    );
  }

  delete() {
    //TODO: Delete Dialog
    const dialogRef = this.dialog.open(YesNoDialogComponent, {data: {
      header: `Dieses Spiel löschen?`,
      yesText: `Löschen`,
      noText: `Nicht löschen`
    }});

    this.subscribtions.push(
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.subscribtions.push(
            this.gameService.delete(this.gameId).subscribe(() => {
              this.router.navigate(['/games']);
            })
          );
        }
      })
    );
  }

  displayFn(season?: SeasonWithId) {
    return season? season.name : undefined;
  }
}
