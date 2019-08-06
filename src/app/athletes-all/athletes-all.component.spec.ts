import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AthletesAllComponent } from './athletes-all.component';

describe('AthletesAllComponent', () => {
  let component: AthletesAllComponent;
  let fixture: ComponentFixture<AthletesAllComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AthletesAllComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AthletesAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
