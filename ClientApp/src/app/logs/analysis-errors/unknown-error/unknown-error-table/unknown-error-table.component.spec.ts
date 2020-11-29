import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnknownErrorTableComponent } from './unknown-error-table.component';

describe('UnknownErrorTableComponent', () => {
  let component: UnknownErrorTableComponent;
  let fixture: ComponentFixture<UnknownErrorTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnknownErrorTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnknownErrorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
