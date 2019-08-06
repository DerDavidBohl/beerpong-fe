import { Component, OnInit } from '@angular/core';
import { AthleteWithId, AthleteService } from '../athlete.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-athletes-all',
  templateUrl: './athletes-all.component.html',
  styleUrls: ['./athletes-all.component.css']
})
export class AthletesAllComponent implements OnInit {


  athletes: AthleteWithId[];

  constructor(private athleteService: AthleteService,
              private router: Router) { }

  ngOnInit() {
    this.athleteService.getAll().subscribe(athls => {
      this.athletes = athls;
    });
  }

  athleteSelected(athlete: AthleteWithId) {
    this.router.navigate(['/athletes/' + athlete.id]);
  }

}
