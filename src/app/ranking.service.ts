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

  getAllAthleteRankings() {
    return this.http.get<AthleteRanking[]>(`${this.url}/athletes`);
  }
}

export interface AthleteRanking {
	rank: number;
	amountOfVictories: number;
	hostileHits: number;
	ownHits: number;
	athlete: AthleteWithId;
}
