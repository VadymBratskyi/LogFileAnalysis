import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UploaderFilesComponent } from './uploader-files.component';

describe('UploaderFilesComponent', () => {
  let component: UploaderFilesComponent;
  let fixture: ComponentFixture<UploaderFilesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploaderFilesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UploaderFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
