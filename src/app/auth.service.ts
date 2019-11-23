import { Injectable } from "@angular/core";
import { ServiceTemplate } from "./service.template";
import { SettingsService } from "./settings.service";
import {
  HttpClient,
  HttpResponse} from "@angular/common/http";
import { Router } from "@angular/router";
import { SettingsHttpService } from './settings-http.service';

export const TOKEN_NAME: string = "jwt_token";

@Injectable({
  providedIn: "root"
})
export class AuthService extends ServiceTemplate {

  constructor(
    public http: HttpClient, private settingsService: SettingsService,
    private settingsHttpService: SettingsHttpService,
    private router: Router
  ) 
  {
    super(http, '/login', settingsService);

  }

  login(email: string, password: string) {

    this.http
      .post<Token>(this.settingsService.settings.apiUrl + '/login', { email, password })
      .subscribe(
        token => {
          this.setToken(token.token);
          this.router.navigate(['']);
        },
        error => {          
          this.router.navigate(['/login/failed']);
        }
      );
  }

  logout() {
    localStorage.removeItem(TOKEN_NAME);
    this.router.navigate(['/']);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN_NAME, token);
  }

  loggedIn(): boolean {
    return localStorage.getItem(TOKEN_NAME) !== null;
  }
}

interface Token {
  token: string;
}

interface Login {
  email: string;
  password: string;
}
