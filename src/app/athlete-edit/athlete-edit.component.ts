import { Component, OnInit, OnDestroy } from "@angular/core";
import { AthleteService, AthleteBase } from "../athlete.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MatDialog } from '@angular/material';
import { YesNoDialogComponent } from '../yes-no-dialog/yes-no-dialog.component';

@Component({
  selector: "app-athlete-edit",
  templateUrl: "./athlete-edit.component.html",
  styleUrls: ["./athlete-edit.component.css"]
})
export class AthleteEditComponent implements OnInit, OnDestroy {
  athlete: AthleteBase;
  new: boolean;
  subscribed: Subscription[] = [];
  athleteId: string = null;

  constructor(
    private route: ActivatedRoute,
    private athleteService: AthleteService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.subscribed.push(
      this.route.data.subscribe(data => {
        this.new = data.new;

        if (this.new) {
          this.athlete = {
            name: ''
          };
        } else {
          this.subscribed.push(
            this.route.params.subscribe(params => {
              if (params.athleteId)
                this.athleteId = params.athleteId;
                this.athleteService
                  .getById(params.athleteId)
                  .subscribe(athlete => (this.athlete = athlete));
            })
          );
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subscribed.forEach(sub => {
      sub.unsubscribe();
    });
  }

  save() {
    if (this.new) {
      this.subscribed.push(
        this.athleteService.create(this.athlete).subscribe(() => {
          this.router.navigate(["/athletes"]);
        })
      );
    } else {
      this.subscribed.push(
        this.athleteService.save({
          id: this.athleteId,
          name: this.athlete.name
        }).subscribe(() => {
          this.router.navigate(['/athletes'])
        })
      );
    }
  }

  delete() {
    const dialogRef = this.dialog.open(YesNoDialogComponent, {data: {
      header: `${this.athlete.name} löschen?`,
      yesText: `Löschen`,
      noText: `Nicht löschen`
    }});

    this.subscribed.push(
      dialogRef.afterClosed().subscribe(result => {
        if(result) {
          this.subscribed.push(this.athleteService.delete(this.athleteId).subscribe(() => {
            this.router.navigate(['/athletes']);
          }));
        }
      })
    );
  }
}
