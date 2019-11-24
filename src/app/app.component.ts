import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSidenav, MatDialog } from '@angular/material';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { InviteDialogComponent } from './invite-dialog/invite-dialog.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: []
})
export class AppComponent implements OnInit{
  @ViewChild('drawer', null) drawer: MatSidenav;

  constructor(public auth: AuthService, public userService: UserService,
    public dialog: MatDialog) {}

  ngOnInit(): void {
    this.userService.updateCurrentUser();
  }

  closeIfDisplayIsSmall(){
    this.drawer.close();
  }

  invite() {
    this.dialog.open(InviteDialogComponent);
  }
  
  logout() {
    this.auth.logout();
  }
}
