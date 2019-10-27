import { Component, OnInit, ViewChild } from "@angular/core";
import { MatTableDataSource, MatSort } from "@angular/material";
import { RankingService } from "../ranking.service";
import { SeasonService, SeasonWithId } from "../season.service";
import { Observable } from "rxjs";
import { FormControl } from "@angular/forms";
import { startWith, map } from "rxjs/operators";

@Component({
  selector: "app-ranking-teams",
  templateUrl: "./ranking-teams.component.html",
  styleUrls: ["./ranking-teams.component.css"]
})
export class RankingTeamComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  displayedColumns: string[] = [
    "position",
    "name",
    "games",
    "victories",
    "defeats",
    "ownHits",
    "hostileHits"
  ];
  dataSource;

  selectedSeason: SeasonWithId = null;
  allSeasons: SeasonWithId[];
  filteredSeasons: Observable<SeasonWithId[]>;
  stateCtrl = new FormControl();

  constructor(
    private rankingService: RankingService,
    private seasonService: SeasonService
  ) {}

  ngOnInit() {
    this.updateRanking();

    this.seasonService.getAll().subscribe(seasons => {
      this.allSeasons = seasons;

      this.filteredSeasons = this.stateCtrl.valueChanges.pipe(
        startWith(""),
        map(season =>
          season ? this._filterStates(season) : this.allSeasons.slice()
        )
      );

      this.stateCtrl.valueChanges.subscribe(value => {
        this.selectedSeason = value;
        this.updateRanking();
      });
    });
  }

  updateRanking() {
    let seasonId = null;

    if (this.selectedSeason) {
      seasonId = this.selectedSeason.id;
    }

    this.rankingService.getAllTeamRankings(seasonId).subscribe(rankings => {
      this.dataSource = new MatTableDataSource(rankings);
      this.dataSource.sort = this.sort;
    });
  }

  displayFn(season?: SeasonWithId): string | undefined {
    return season ? season.name : undefined;
  }

  private _filterStates(value: string): SeasonWithId[] {
    let filterValue = value.toLowerCase();

    return this.allSeasons.filter(
      season => season.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
