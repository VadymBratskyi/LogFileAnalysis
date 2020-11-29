import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KnownErrorComponent } from './known-error.component';

describe('KnownErrorComponent', () => {
  let component: KnownErrorComponent;
  let fixture: ComponentFixture<KnownErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KnownErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KnownErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
