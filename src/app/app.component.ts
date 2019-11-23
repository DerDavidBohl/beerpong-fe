import { Component, ViewChild } from '@angular/core';
import { MatSidenav, MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { Observable } from 'rxjs';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { MomentDateAdapter, MAT_MOMENT_DATE_FORMATS } from '@angular/material-moment-adapter';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent {
  @ViewChild('drawer', null) drawer: MatSidenav;

  constructor(public auth: AuthService) {}

  closeIfDisplayIsSmall(){
    this.drawer.close();
  }
  
  logout() {
    this.auth.logout();
  }
}
