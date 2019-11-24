import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { UserService } from '../user.service';

@Component({
  selector: 'app-invite-dialog',
  templateUrl: './invite-dialog.component.html',
  styleUrls: ['./invite-dialog.component.css']
})
export class InviteDialogComponent implements OnInit {

  email = new FormControl();

  constructor(public dialogRef: MatDialogRef<null>, private users:UserService, private snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  invite() {
    this.users.invite(this.email.value).subscribe(() => {
      this.snackBar.open(`Eine Einladungs-Mail wurde an ${this.email.value} versant.`, null, {duration: 1000});
      this.dialogRef.close();
    });
  }
}
