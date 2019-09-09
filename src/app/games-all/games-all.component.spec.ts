import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesAllComponent } from './games-all.component';

describe('GamesAllComponent', () => {
  let component: GamesAllComponent;
  let fixture: ComponentFixture<GamesAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamesAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
