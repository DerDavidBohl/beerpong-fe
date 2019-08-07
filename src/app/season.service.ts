import { Injectable } from '@angular/core';
import { ServiceTemplate } from './service.template';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SeasonService extends ServiceTemplate {

  constructor(public http: HttpClient) {
    super(http, '/seasons');
  }

  getAll() {
    return this.http.get<SeasonWithId[]>(this.url);
  }

  getById(id: string) {
    return this.http.get<SeasonBase>(this.url + `/${id}`);
  }

  save(id: string, season: SeasonBase) {
    return this.http.put(`${this.url}/${id}`, season);
  }

  create(season: SeasonBase) {
    console.log(season);
    return this.http.post(`${this.url}`, season);
  }

  delete(id: string ){
    return this.http.delete(`${this.url}/${id}`);
  }
}

export interface SeasonBase {
  from: Date,
  to: Date,
  name: string
}

export interface SeasonWithId {
  id: string
}
