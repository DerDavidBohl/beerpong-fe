import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SeasonWithId } from "./season.service";
import { TeamWithId } from "./team.service";
import { AthleteWithId } from "./athlete.service";
import { ServiceTemplate } from "./service.template";
import { SettingsService } from "./settings.service";
import { element } from "protractor";
import {
  map,
  mergeMap,
  flatMap,
  combineAll,
  expand,
  switchMap,
  mapTo,
  take,
  concatMap,
  first,
  merge
} from "rxjs/operators";
import { delay } from "q";
import { from, forkJoin } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GameService extends ServiceTemplate {
  constructor(
    public http: HttpClient,
    private settingsService: SettingsService
  ) {
    super(http, "/games", settingsService);
  }

  private GameToGameWithReferences(game: Game): GameWithReferences {
    let refGame: GameWithReferences = {
      date: game.date,
      scoreTeam1: game.scoreTeam1,
      scoreTeam2: game.scoreTeam2,
      season: null,
      team1: null,
      team2: null
    };

    if (game.season) {
      refGame.season = game.season.id;
    }

    if (game.team1) {
      refGame.team1 = game.team1.id;
    }

    if (game.team2) {
      refGame.team2 = game.team2.id;
    }

    return refGame;
  }

  getAll() {
    return this.http.get<GameWithId[]>(this.url);
  }

  getSpecific(id: string) {
    return this.http.get<Game>(`${this.url}/${id}`);
  }

  create(game: Game) {
    return this.http
      .post(`${this.url}`, this.GameToGameWithReferences(game), {
        observe: "response"
      })
      .pipe(map(response => response.headers.get("location")));
  }

  save(game: Game, id: string) {
    return this.http.put(`${this.url}/${id}`, this.GameToGameWithReferences(game));
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  getAthletesOfTeam(id: string, teamNumber: number) {
    return this.http.get(`${this.url}/${id}/athletesTeam${teamNumber}`);
  }

  addAthleteToTeam(id: string, teamNumber: number, athleteId: string) {
    return this.http.post(`${this.url}/${id}/athletesTeam${teamNumber}`, {
      id: athleteId
    });
  }

  setAthletesForBothTeams(
    gameId: string,
    athletesTeam1: AthleteWithId[],
    athletesTeam2: AthleteWithId[]
  ) {
    const requests = forkJoin([
      this.setAthletesForTeam(gameId, 1, athletesTeam1),
      this.setAthletesForTeam(gameId, 2, athletesTeam2)
    ]);

    return requests;
  }

  getAthletesOfBothTeams(gameId: string) {
    const requests = forkJoin<AthleteWithId[], AthleteWithId[]>([
      this.getAthletesOfTeam(gameId, 1),
      this.getAthletesOfTeam(gameId, 2)
    ]);

    return requests.pipe(
      map(res => {
        return { athletesTeam1: res[0], athletesTeam2: res[1] };
      })
    );
  }

  setAthletesForTeam(
    id: string,
    teamNumber: number,
    athletes: AthleteWithId[]
  ) {
    const ids = [];
    athletes.forEach(athlete => {
      ids.push(athlete.id);
    });

    return this.http.put(`${this.url}/${id}/athletesTeam${teamNumber}`, ids);
  }

  removeAthleteFromTeam(
    id: string,
    teamNumber: number,
    athleteId: AthleteWithId
  ) {
    return this.http.delete(
      `${this.url}/${id}/athletesTeam${teamNumber}/${athleteId}`
    );
  }
}

export interface Game {
  date: Date;
  scoreTeam1: number;
  scoreTeam2: number;
  season: SeasonWithId;
  team1: TeamWithId;
  team2: TeamWithId;
}

export interface GameWithId extends Game {
  id: string;
}

export interface GameWithReferences {
  date: Date;
  scoreTeam1: number;
  scoreTeam2: number;
  season: string;
  team1: string;
  team2: string;
}
