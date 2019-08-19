import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamsAllComponent } from './teams-all.component';

describe('TeamsAllComponent', () => {
  let component: TeamsAllComponent;
  let fixture: ComponentFixture<TeamsAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamsAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
