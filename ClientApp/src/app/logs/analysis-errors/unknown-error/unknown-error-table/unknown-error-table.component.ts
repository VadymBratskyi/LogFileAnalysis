import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { KnownErrorConfig, LogTableState, UnKnownError } from '@log_models';
import { ErrorLogObjectsService } from '@log_services';
import { UnknownErrorDataGrid } from 'app/_models/errors/unknown-error-data-grid';
import { of, ReplaySubject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-unknown-error-table',
	templateUrl: './unknown-error-table.component.html',
	styleUrls: ['./unknown-error-table.component.scss'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({height: '0px', minHeight: '0'})),
			state('expanded', style({height: '*'})),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class UnknownErrorTableComponent implements OnInit, OnDestroy  {

	private destroyed$: ReplaySubject<boolean> = new ReplaySubject();
	public dataSource: UnKnownError[];
	public displayTableColumns = [ 'messageId', 'message', 'count' ];
	public pageSizeOptions = [10, 25, 50, 100];
	public resultsLength = 0;
	public logTableState = {
		skip: 0,
		take: 10
	} as LogTableState;
	public isLoadingResults: boolean;
	public isRateLimitReached: boolean;
	public expandedElement: boolean;
	constructor(private errorLogObjectsService: ErrorLogObjectsService) { }

	public ngOnInit() {
		this.onLoadData();
	}

	private onLoadData() {
		this.isLoadingResults = true;
		this.errorLogObjectsService.getAllUnKnownErrorData(this.logTableState)
			.pipe(
			takeUntil(this.destroyed$),
			catchError(() => {
				this.isLoadingResults = false;
				this.isRateLimitReached = true;
				return of([]);
			})
			).subscribe((unKnownErrorsData: UnknownErrorDataGrid) => {
			this.isLoadingResults = false;
			this.dataSource = unKnownErrorsData.data;
			this.resultsLength = unKnownErrorsData.countLogs;
			});
	}

	public pageChanges(changeData: PageEvent) {
		this.logTableState.take = changeData.pageSize;
		const skip = changeData.pageIndex * this.logTableState.take;
		this.logTableState.skip = skip;
		this.onLoadData();
	}

	public onSaveErrorSettings(knownConfig: KnownErrorConfig) {
		this.errorLogObjectsService.setKnownError(knownConfig)
			.pipe(takeUntil(this.destroyed$))
			.subscribe(result => {
			this.onLoadData();
			});
	}
	ngOnDestroy() {
		this.destroyed$.next(true);
		this.destroyed$.complete();
	}

}