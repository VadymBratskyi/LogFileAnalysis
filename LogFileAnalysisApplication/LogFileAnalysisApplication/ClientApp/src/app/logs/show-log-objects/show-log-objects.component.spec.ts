import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLogObjectsComponent } from './show-log-objects.component';

describe('ShowLogObjectsComponent', () => {
  let component: ShowLogObjectsComponent;
  let fixture: ComponentFixture<ShowLogObjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowLogObjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowLogObjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
