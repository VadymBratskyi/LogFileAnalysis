import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedStatusComponent } from './selected-status.component';

describe('SelectedStatusComponent', () => {
  let component: SelectedStatusComponent;
  let fixture: ComponentFixture<SelectedStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
