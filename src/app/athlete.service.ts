import { Injectable, OnInit } from "@angular/core";
import { HttpClient, HttpResponse, HttpParams } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { map } from 'rxjs/operators';
import { ServiceTemplate } from './service.template';

@Injectable({
  providedIn: "root"
})
export class AthleteService extends ServiceTemplate {

  constructor(public http: HttpClient) {
    super(http, '/athletes');
  }

  create(athlete: AthleteBase ) {
    return this.http.post(this.url, athlete, {observe: 'response'}).pipe(
      map(response => response.headers.get('location'))
    );
  }

  getAll(searchString: string = null) {

    if(searchString)
      return this.http.get<AthleteWithId[]>(this.url, {params: new HttpParams().set('name', searchString)});
    
    return this.http.get<AthleteWithId[]>(this.url);
  }

  getById(athleteId: string) {
    return this.http.get<AthleteBase>(this.url + `/${athleteId}`);
  }

  delete(athleteId: string) {
    return this.http.delete(this.url + `/${athleteId}`);
  }

  save(athlete: AthleteWithId) {
    return this.http.put(this.url + `/${athlete.id}`, this.mapAthleteWithIdToAthleteBase(athlete));
  }

  private mapAthleteWithIdToAthleteBase(athleteWithId: AthleteWithId): AthleteBase {
    return {name: athleteWithId.name};
  }
}

export interface AthleteBase {
  name: string;
}

export interface AthleteWithId extends AthleteBase {
  id: string;
}
