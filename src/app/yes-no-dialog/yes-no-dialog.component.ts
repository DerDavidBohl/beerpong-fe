import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-yes-no-dialog',
  templateUrl: './yes-no-dialog.component.html',
  styleUrls: ['./yes-no-dialog.component.css']
})
export class YesNoDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<YesNoDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: YesNoDialogData) { }

  closeDialog(result: boolean) {
    this.dialogRef.close(result);
  }

  ngOnInit() {
  }

}

export interface YesNoDialogData {
  header: string
  yesText: string
  noText: string
}
