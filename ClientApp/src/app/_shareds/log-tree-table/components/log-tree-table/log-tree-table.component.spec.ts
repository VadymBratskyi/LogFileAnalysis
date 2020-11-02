import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogTreeTableComponent } from './log-tree-table.component';

describe('LogTreeTableComponent', () => {
  let component: LogTreeTableComponent;
  let fixture: ComponentFixture<LogTreeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogTreeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogTreeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
