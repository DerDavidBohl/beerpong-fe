import { Component, OnInit, OnDestroy } from '@angular/core';
import { SeasonService, SeasonWithId } from '../season.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seasons-all',
  templateUrl: './seasons-all.component.html',
  styleUrls: ['./seasons-all.component.css']
})
export class SeasonsAllComponent implements OnInit, OnDestroy {

  seasons: SeasonWithId[];
  subscribed: Subscription[] = [];

  constructor(private seasonService: SeasonService,
              private router: Router) { }

  ngOnInit() {
    this.subscribed.push(
      this.seasonService.getAll().subscribe(seasons => {
        this.seasons = seasons;
      })
    );
  }
  
  ngOnDestroy(): void {
    this.subscribed.forEach(sub => {
      sub.unsubscribe();
    });
  }

  seasonSelected(season: SeasonWithId) {
    this.router.navigate([`/seasons/${season.id}`])
  }

}
