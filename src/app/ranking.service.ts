import { Injectable } from '@angular/core';
import { ServiceTemplate } from './service.template';
import { SettingsService } from './settings.service';
import { HttpClient } from '@angular/common/http';
import { AthleteWithId } from './athlete.service';

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

    console.log(url);
    return this.http.get<AthleteRanking[]>(url);
  }
}

export interface AthleteRanking {
	rank: number;
	amountOfGames: number;
	amountOfVictories: number;
	amountOfDefeats: number;
	ownHits: number;
	hostileHits: number;
	athlete: AthleteWithId;
}