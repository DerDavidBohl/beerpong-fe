import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  public settings: Settings;

  constructor() { 
    this.settings = new Settings();
  }
}

export class Settings {
  apiUrl: string;
}