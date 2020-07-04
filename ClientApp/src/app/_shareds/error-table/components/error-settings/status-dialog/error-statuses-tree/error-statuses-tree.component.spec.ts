import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorStatusesTreeComponent } from './error-statuses-tree.component';

describe('ErrorStatusesTreeComponent', () => {
  let component: ErrorStatusesTreeComponent;
  let fixture: ComponentFixture<ErrorStatusesTreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorStatusesTreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorStatusesTreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
