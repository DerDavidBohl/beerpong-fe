import { Injectable } from '@angular/core';
import { ServiceTemplate } from './service.template';
import { SettingsService } from './settings.service';
import { HttpClient } from '@angular/common/http';
import { AthleteWithId } from './athlete.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RankingService extends ServiceTemplate {

  constructor(public http: HttpClient, private settingsService: SettingsService) {
    super(http, '/rankings', settingsService);
  }

  getAllAthleteRankings(seasonId: string = null) {
    
    let url = `${this.url}/athletes`

    if(seasonId) {
      url = `${this.url}/athletes?seasonId=${seasonId}`;
    }

    return this.http.get<RawRanking[]>(url);
  }

  getAllTeamRankings(seasonId: string = null) {
    
    let url = `${this.url}/teams`

    if(seasonId) {
      url = `${this.url}/teams?seasonId=${seasonId}`;
    }

    return this.http.get<RawRanking[]>(url);
  }
}

export interface RawRanking extends BaseRanking {  
	entity: AthleteWithId;
}

export interface BaseRanking {
	rank: number;
	amountOfGames: number;
	amountOfVictories: number;
	amountOfDefeats: number;
	ownHits: number;
	hostileHits: number;
}