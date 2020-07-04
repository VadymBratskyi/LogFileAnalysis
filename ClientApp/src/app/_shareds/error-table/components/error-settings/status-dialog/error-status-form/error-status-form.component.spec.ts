import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorStatusFormComponent } from './error-status-form.component';

describe('ErrorStatusFormComponent', () => {
  let component: ErrorStatusFormComponent;
  let fixture: ComponentFixture<ErrorStatusFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorStatusFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorStatusFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
