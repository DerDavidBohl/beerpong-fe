import { Injectable } from "@angular/core";
import { ServiceTemplate } from "./service.template";
import { SettingsService } from "./settings.service";
import { HttpClient, HttpParams } from "@angular/common/http";
import { AuthService } from "./auth.service";
import { Observable, throwError, Subscribable, Subject } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService extends ServiceTemplate {
  constructor(
    public http: HttpClient,
    private settingService: SettingsService
  ) {
    super(http, "/users", settingService);
    this.currentUser.next(null);
  }

  currentUser: Subject<User> = new Subject<User>();

  private getCurrentUser() {
    return this.http.get<User>(`${this.settingService.settings.apiUrl}/users/current`);
  }

  public updateCurrentUser() {
    this.getCurrentUser().subscribe(user => this.currentUser.next(user));
  }

  createUser(token: string, user: CreateUser) {

    const params = new HttpParams().set('token', token);

    return this.http.post(`${this.settingService.settings.apiUrl}/users`, user, {params: params});
  }

  invite(email: string) {
    return this.http.post(`${this.settingService.settings.apiUrl}/users/invite`, {email: email});
  }
}

export interface User {
  email: string;
  name: string;
}

export interface CreateUser extends User {
  password: string;
}
