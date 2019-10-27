import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingAthleteComponent } from './ranking-athletes.component';

describe('RankingAthleteComponent', () => {
  let component: RankingAthleteComponent;
  let fixture: ComponentFixture<RankingAthleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingAthleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingAthleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
