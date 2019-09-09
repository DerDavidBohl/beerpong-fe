import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesTeamEditComponent } from './games-team-edit.component';

describe('GamesTeamEditComponent', () => {
  let component: GamesTeamEditComponent;
  let fixture: ComponentFixture<GamesTeamEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesTeamEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesTeamEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
