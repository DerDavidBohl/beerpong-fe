import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
import { SeasonBase, SeasonService } from "../season.service";
import { ActivatedRoute, Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { YesNoDialogComponent } from "../yes-no-dialog/yes-no-dialog.component";

@Component({
  selector: "app-seasons-edit",
  templateUrl: "./seasons-edit.component.html",
  styleUrls: ["./seasons-edit.component.css"]
})
export class SeasonsEditComponent implements OnInit, OnDestroy {
  subscribtions: Subscription[] = [];
  season: SeasonBase = {
    from: new Date(),
    to: new Date(),
    name: ""
  };
  new: boolean;
  id: string;

  constructor(
    private seasonService: SeasonService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.subscribtions.push(
      this.route.data.subscribe(data => {
        this.new = data.new;
        if (!data.new) {
          this.loadSeasonFromParams();
        }
      })
    );
  }

  loadSeasonFromParams() {
    this.subscribtions.push(
      this.route.params.subscribe(params =>
        this.loadSeasonById(params.seasonId)
      )
    );
  }

  loadSeasonById(id: string) {
    this.subscribtions.push(
      this.seasonService.getById(id).subscribe(season => {
        this.season = season;
        this.id = id;
      })
    );
  }

  save() {
    this.subscribtions.push(
      this.seasonService.save(this.id, this.season).subscribe(() => {
        this.router.navigate(["/seasons"]);
      })
    );
  }

  delete() {
    console.log('DEL');
    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      data: {
        header: `${this.season.name} löschen?`,
        yesText: `Löschen`,
        noText: `Nicht löschen`
      }
    });

    this.subscribtions.push(
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.subscribtions.push(
            this.seasonService.delete(this.id).subscribe(() => {
              this.router.navigate(["/seasons"]);
            })
          );
        }
      })
    );
  }

  create() {
    this.subscribtions.push(
      this.seasonService.create(this.season).subscribe(() => {
        this.router.navigate(["/seasons"]);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscribtions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
