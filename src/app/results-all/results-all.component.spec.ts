import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultsAllComponent } from './results-all.component';

describe('ResultsAllComponent', () => {
  let component: ResultsAllComponent;
  let fixture: ComponentFixture<ResultsAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultsAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
