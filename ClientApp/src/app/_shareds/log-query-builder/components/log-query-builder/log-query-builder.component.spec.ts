import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LogQueryBuilderComponent } from './log-query-builder.component';

describe('LogQueryBuilderComponent', () => {
  let component: LogQueryBuilderComponent;
  let fixture: ComponentFixture<LogQueryBuilderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LogQueryBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LogQueryBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
