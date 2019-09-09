import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef,
  NgZone,
  ApplicationRef,
  ViewChild
} from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Game, GameService } from "../game.service";
import { TeamService, TeamWithId } from "../team.service";
import { Subscription } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { AthleteWithId, AthleteService } from "../athlete.service";
import { ItemListComponent } from "../item-list/item-list.component";

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
    scoreTeam1: 0,
    scoreTeam2: 0,
    season: null,
    team1: null,
    team2: null
  };

  athletesTeam1: AthleteWithId[] = [];
  athletesTeam2: AthleteWithId[] = [];

  allTeams: TeamWithId[] = [];
  allAthletes: AthleteWithId[] = [];
  gameId: string;

  constructor(
    private teamService: TeamService,
    private athleteService: AthleteService,
    private route: ActivatedRoute,
    private gameService: GameService,
    private router: Router
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

        this.subscribtions.push(
          this.gameService
            .getAthletesOfBothTeams(this.gameId)
            .subscribe(res => {
              this.athletesTeam1 = res.athletesTeam1;
              this.athletesTeam2 = res.athletesTeam2;
            })
        );
      })
    );
  }

  ngOnDestroy(): void {
    this.subscribtions.forEach(sub => sub.unsubscribe());
  }

  create() {
    this.subscribtions.push(
      this.gameService.create(this.game).subscribe(createdGameId => {
        this.subscribtions.push(
          this.gameService
            .setAthletesForBothTeams(
              createdGameId,
              this.athletesTeam1,
              this.athletesTeam2
            )
            .subscribe(() => {
              this.router.navigate([`/games/${createdGameId}`]);
            })
        );
      })
    );
  }

  save() {
    this.subscribtions.push(
      this.gameService.save(this.game, this.gameId).subscribe(() => {
        this.subscribtions.push(
          this.gameService
            .setAthletesForBothTeams(
              this.gameId,
              this.athletesTeam1,
              this.athletesTeam2
            )
            .subscribe(() => this.router.navigate(['/games']))
        );
      })
    );
  }

  delete() {
    this.subscribtions.push(
      this.gameService.delete(this.gameId).subscribe(() => {
        this.router.navigate(['/games']);
      })
    );
  }
}
