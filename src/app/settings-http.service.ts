import { Injectable } from "@angular/core";
import { HttpClient, HttpBackend } from "@angular/common/http";
import { SettingsService, Settings } from "./settings.service";

@Injectable({
  providedIn: "root"
})
export class SettingsHttpService {
  
  constructor(
    private settingsService: SettingsService, 
    private http: HttpClient
  ) {
  }

  initializeApp(): Promise<any> {
    return new Promise(resolve => {
      this.http
        .get("/assets/settings.json")
        .toPromise()
        .then(response => {
          console.log("setting settings");
          
          this.settingsService.settings = <Settings>response;          
          resolve();
        });
    });
  }
}
