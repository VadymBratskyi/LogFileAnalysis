import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TreeChecklistComponent } from './tree-checklist.component';

describe('TreeChecklistComponent', () => {
  let component: TreeChecklistComponent;
  let fixture: ComponentFixture<TreeChecklistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TreeChecklistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TreeChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
