import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { RankingService, AthleteRanking } from '../ranking.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-results-all',
  templateUrl: './results-all.component.html',
  styleUrls: ['./results-all.component.css']
})
export class ResultsAllComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  displayedColumns: string[] = ['position', 'name', 'victories', 'ownHits', 'hostileHits'];
  dataSource;
  
  constructor(private rankingService: RankingService) { }

  ngOnInit() {
    this.rankingService.getAllAthleteRankings().subscribe(rankings => {
      this.dataSource = new MatTableDataSource(rankings);
      this.dataSource.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
