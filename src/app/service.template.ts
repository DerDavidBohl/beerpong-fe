import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { SettingsService } from './settings.service';

export class ServiceTemplate {
    public url: string;
  
    constructor(public http: HttpClient, path: string, settingsService: SettingsService) {
      this.url = settingsService.settings.apiUrl + path;
    }
}