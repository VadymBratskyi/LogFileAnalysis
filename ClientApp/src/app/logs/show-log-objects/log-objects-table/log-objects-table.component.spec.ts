import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogObjectsTableComponent } from './log-objects-table.component';

describe('LogObjectsTableComponent', () => {
  let component: LogObjectsTableComponent;
  let fixture: ComponentFixture<LogObjectsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogObjectsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogObjectsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
