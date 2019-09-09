import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameService, GameWithId } from '../game.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-games-all',
  templateUrl: './games-all.component.html',
  styleUrls: ['./games-all.component.css']
})
export class GamesAllComponent implements OnInit, OnDestroy {
  
  private subscribtions: Subscription[] = [];

  allGames: GameWithId[];
  
  constructor(private gameService: GameService) { }
  
  ngOnInit() {
    this.subscribtions.push(
      this.gameService.getAll().subscribe(all => this.allGames = all)
    );
  }
  
  ngOnDestroy(): void {
    this.subscribtions.forEach(sub => sub.unsubscribe());
  }
}
