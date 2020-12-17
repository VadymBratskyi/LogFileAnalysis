import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { KnownErrorDTO, LogTableState, LogTreeModel } from '@log_models';
import { ErrorLogObjectsService } from '@log_services';
import { KnownErrorDataGrid } from 'app/_models/errors/known-error-data-grid';
import { of, ReplaySubject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-known-error-table',
  templateUrl: './known-error-table.component.html',
  styleUrls: ['./known-error-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class KnownErrorTableComponent implements OnInit, OnDestroy {
	private destroyed$: ReplaySubject<boolean> = new ReplaySubject();
	private _expandableColumns = ['answer', 'status'];
	public dataSource: KnownErrorDTO[];
	public displayTableColumns = [ 'message', 'countFounded' ];
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
		this.errorLogObjectsService.getAllKnownErrorData(this.logTableState)
		.pipe(
			takeUntil(this.destroyed$),
			catchError(() => {
				this.isLoadingResults = false;
				this.isRateLimitReached = true;
				return of([]);
			})
		).subscribe((unKnownErrorsData: KnownErrorDataGrid) => {
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

	public getExpandTreeData(element: KnownErrorDTO): LogTreeModel[] {
		const treeModels: LogTreeModel[] = [];
		if (this._expandableColumns) {
			this._expandableColumns.forEach(column => {
			const treeModel = new LogTreeModel();
			const treeNode = {
				key: column,
				value: JSON.stringify(element[column])
			};
			treeModel.value = treeNode;
			treeModel.children = element[column];
			treeModels.push(treeModel);
			});
		}
		return treeModels;
	}

	ngOnDestroy() {
		this.destroyed$.next(true);
		this.destroyed$.complete();
	}

}
