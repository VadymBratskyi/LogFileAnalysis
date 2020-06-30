import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorSettingsComponent } from './error-settings.component';

describe('ErrorSettingsComponent', () => {
  let component: ErrorSettingsComponent;
  let fixture: ComponentFixture<ErrorSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrorSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
