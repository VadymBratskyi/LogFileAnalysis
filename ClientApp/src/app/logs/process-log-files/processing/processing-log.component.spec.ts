import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessingLogComponent } from './processing-log.component';

describe('ProcessingLogComponent', () => {
  let component: ProcessingLogComponent;
  let fixture: ComponentFixture<ProcessingLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessingLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessingLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
