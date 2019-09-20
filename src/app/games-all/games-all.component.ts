import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService, GameWithId } from '../game.service';
import { Subscription, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { SeasonWithId, SeasonService } from '../season.service';
import { FormControl } from '@angular/forms';
import { startWith, map } from 'rxjs/operators';
import { basename } from 'path';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-games-all',
  templateUrl: './games-all.component.html',
  styleUrls: ['./games-all.component.css']
})
export class GamesAllComponent implements OnInit, OnDestroy {
  
  private subscribtions: Subscription[] = [];

  allGames: Observable<GameWithId[]>;
  seasonCtrl = new FormControl();
  allSeasons: Observable<SeasonWithId[]>;
  datePipe = new DatePipe('de-DE');
    
  constructor(private gameService: GameService,
    public router: Router,
    private seasonService: SeasonService) { 
    }
  
  ngOnInit() {
    this.allGames = this.gameService.getAll();
    this.allSeasons = this.seasonService.getAll();
  }
  
  ngOnDestroy(): void {
    this.subscribtions.forEach(sub => sub.unsubscribe());
  }
}
