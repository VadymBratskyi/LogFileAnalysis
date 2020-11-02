import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisErrorsComponent } from './analysis-errors.component';

describe('AnalysisErrorsComponent', () => {
  let component: AnalysisErrorsComponent;
  let fixture: ComponentFixture<AnalysisErrorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisErrorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisErrorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
