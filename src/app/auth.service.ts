import { Injectable, OnInit } from "@angular/core";
import { ServiceTemplate } from "./service.template";
import { SettingsService } from "./settings.service";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Router } from "@angular/router";
import { SettingsHttpService } from "./settings-http.service";
import { Observable } from 'rxjs';
import { UserService, User } from './user.service';
import { MatDialog } from '@angular/material';
import { InviteDialogComponent } from './invite-dialog/invite-dialog.component';

export const TOKEN_NAME: string = "jwt_token";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    public http: HttpClient,
    private settingsService: SettingsService,
    private router: Router, private users: UserService,
    public dialog: MatDialog
  ) {
  }

  invite() {
    this.dialog.open(InviteDialogComponent);
  }

  login(email: string, password: string) {
    this.http
      .post<Token>(this.settingsService.settings.apiUrl + "/login", {
        email,
        password
      })
      .subscribe(
        token => {
          this.setToken(token.token);
          this.router.navigate([""]);
          this.users.updateCurrentUser();
        },
        error => {
          this.router.navigate(["/login/failed"]);
          this.users.updateCurrentUser();
        }
      );
  }

  logout() {
    localStorage.removeItem(TOKEN_NAME);
    this.router.navigate(["/"]);
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
