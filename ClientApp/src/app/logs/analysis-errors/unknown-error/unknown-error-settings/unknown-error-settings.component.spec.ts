import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnknownErrorSettingsComponent } from './unknown-error-settings.component';

describe('UnknownErrorSettingsComponent', () => {
  let component: UnknownErrorSettingsComponent;
  let fixture: ComponentFixture<UnknownErrorSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnknownErrorSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnknownErrorSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
