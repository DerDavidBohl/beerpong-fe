import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

export class ServiceTemplate {
    public url: string;
  
    constructor(public http: HttpClient, path: string) {
      this.url = environment.backendServiceUrl + path;
    }
}