import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnownErrorTableComponent } from './known-error-table.component';

describe('KnownErrorTableComponent', () => {
  let component: KnownErrorTableComponent;
  let fixture: ComponentFixture<KnownErrorTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnownErrorTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnownErrorTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
