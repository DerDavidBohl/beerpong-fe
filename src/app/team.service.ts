import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SettingsService } from './settings.service';
import { ServiceTemplate } from './service.template';
import { AthleteWithId } from './athlete.service';

@Injectable({
  providedIn: 'root'
})
export class TeamService extends ServiceTemplate {

  constructor(public http: HttpClient, private settingsService: SettingsService) {
    super(http, '/teams', settingsService);
  }

  getAll(searchTerm: string = null) {
    if(searchTerm)
      return this.http.get<AthleteWithId[]>(this.url, {params: new HttpParams().set('name', searchTerm)});
    else
      return this.http.get<TeamWithId[]>(this.url);
  }

  getSpecific(teamId) {
    return this.http.get<TeamWithMembers>(this.url + `/${teamId}`)
  }

  create(team: TeamBase) {
    return this.http.post(this.url, team);
  }

  save(team: TeamBase, id: string) {
    return this.http.put(`${this.url}/${id}`, team);
  }

  delete(teamId: string) {
    return this.http.delete(`${this.url}/${teamId}`);
  }

  addMember(teamId, athleteId) {
    return this.http.post(`${this.url}/${teamId}/members`, {id: athleteId});
  }

  deleteMember(teamId, athleteId) {
    return this.http.delete(`${this.url}/${teamId}/members/${athleteId}`);
  }
}

export interface TeamBase {
  name: string;
}

export interface TeamWithId extends TeamBase {
  id: string;
}

export interface TeamWithMembers extends TeamBase {
  members: AthleteWithId[];
}
