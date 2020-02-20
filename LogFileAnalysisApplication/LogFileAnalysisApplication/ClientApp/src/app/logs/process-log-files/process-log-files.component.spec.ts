import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessLogFilesComponent } from './process-log-files.component';

describe('ProcessLogFilesComponent', () => {
  let component: ProcessLogFilesComponent;
  let fixture: ComponentFixture<ProcessLogFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessLogFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessLogFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
