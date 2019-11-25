import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { SeasonWithId } from "./season.service";
import { TeamWithId } from "./team.service";
import { AthleteWithId } from "./athlete.service";
import { ServiceTemplate } from "./service.template";
import { SettingsService } from "./settings.service";
import {
  map} from "rxjs/operators";
import { forkJoin } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GameService extends ServiceTemplate {
  constructor(
    public http: HttpClient,
    settingsService: SettingsService
  ) {
    super(http, "/games", settingsService);
  }

  private GameToGameWithReferences(game: Game): GameWithReferences {
    let refGame: GameWithReferences = {
      date: game.date,
      remainingCupsTeam1: game.remainingCupsTeam1,
      remainingCupsTeam2: game.remainingCupsTeam2,
      season: null,
      team1: null,
      team2: null,
      athletesTeam1: [],
      athletesTeam2: []
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

    game.athletesTeam1.forEach(athlete => refGame.athletesTeam1.push(athlete.id));

    game.athletesTeam2.forEach(athlete => refGame.athletesTeam2.push(athlete.id));

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
      });
  }

  save(game: Game, id: string) {
    return this.http.put(`${this.url}/${id}`, this.GameToGameWithReferences(game));
  }

  delete(id: string) {
    return this.http.delete(`${this.url}/${id}`);
  }

  addAthleteToTeam(id: string, teamNumber: number, athleteId: string) {
    return this.http.post(`${this.url}/${id}/athletesTeam${teamNumber}`, {
      id: athleteId
    });
  }
}

export interface Game {
  date: Date;
  remainingCupsTeam1: number;
  remainingCupsTeam2: number;
  season: SeasonWithId;
  team1: TeamWithId;
  team2: TeamWithId;
  athletesTeam1: AthleteWithId[];
  athletesTeam2: AthleteWithId[];
}

export interface GameWithId extends Game {
  id: string;
}

export interface GameWithReferences {
  date: Date;
  remainingCupsTeam1: number;
  remainingCupsTeam2: number;
  season: string;
  team1: string;
  team2: string;
  athletesTeam1: string[];
  athletesTeam2: string[];
}
