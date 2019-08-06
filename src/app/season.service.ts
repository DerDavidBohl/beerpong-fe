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
}

export interface SeasonBase {
  from: Date,
  to: Date,
  name: string
}

export interface SeasonWithId {
  id: string
}
