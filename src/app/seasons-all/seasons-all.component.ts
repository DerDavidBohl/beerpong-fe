import { Component, OnInit, OnDestroy } from '@angular/core';
import { SeasonService, SeasonWithId } from '../season.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-seasons-all',
  templateUrl: './seasons-all.component.html',
  styleUrls: ['./seasons-all.component.css']
})
export class SeasonsAllComponent implements OnInit, OnDestroy {

  seasons: SeasonWithId[];
  subscribed: Subscription[] = [];

  constructor(private seasonService: SeasonService) { }

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

}
