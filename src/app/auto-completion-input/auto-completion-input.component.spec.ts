import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCompletionInputComponent } from './auto-completion-input.component';

describe('AutoCompletionInputComponent', () => {
  let component: AutoCompletionInputComponent;
  let fixture: ComponentFixture<AutoCompletionInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoCompletionInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCompletionInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
