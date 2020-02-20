import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnalysisLogObjectsComponent } from './analysis-log-objects.component';

describe('AnalysisLogObjectsComponent', () => {
  let component: AnalysisLogObjectsComponent;
  let fixture: ComponentFixture<AnalysisLogObjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnalysisLogObjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnalysisLogObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
