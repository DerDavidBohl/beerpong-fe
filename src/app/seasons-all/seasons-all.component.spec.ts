import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeasonsAllComponent } from './seasons-all.component';

describe('SeasonsAllComponent', () => {
  let component: SeasonsAllComponent;
  let fixture: ComponentFixture<SeasonsAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeasonsAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeasonsAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
