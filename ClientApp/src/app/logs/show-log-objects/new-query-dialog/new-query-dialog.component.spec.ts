import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewQueryDialogComponent } from './new-query-dialog.component';

describe('NewQueryDialogComponent', () => {
let component: NewQueryDialogComponent;
let fixture: ComponentFixture<NewQueryDialogComponent>;

beforeEach(async () => {
	await TestBed.configureTestingModule({
		declarations: [ NewQueryDialogComponent ]
	})
	.compileComponents();
});

beforeEach(() => {
	fixture = TestBed.createComponent(NewQueryDialogComponent);
	component = fixture.componentInstance;
	fixture.detectChanges();
});

it('should create', () => {
	expect(component).toBeTruthy();
});
});
