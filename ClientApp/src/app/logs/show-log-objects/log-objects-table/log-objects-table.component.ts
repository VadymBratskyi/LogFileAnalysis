import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LogQueryRuleSet, LogsDataGrid, LogsDtoModel, LogTableState, LogTreeModel } from '@log_models';
import { ShowLogObjectsService } from '@log_services';
import { of, ReplaySubject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';

@Component({
	selector: 'app-log-objects-table',
	templateUrl: './log-objects-table.component.html',
	styleUrls: ['./log-objects-table.component.scss'],
	animations: [
		trigger('detailExpand', [
			state('collapsed', style({height: '0px', minHeight: '0'})),
			state('expanded', style({height: '*'})),
			transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
		]),
	],
})
export class LogObjectsTableComponent implements OnInit, OnDestroy {
	private _destroyed$: ReplaySubject<boolean> = new ReplaySubject();
	private _expandableColumns = ['request', 'response'];
	public dataSource: LogsDtoModel[];
	public displayTableColumns = ['messageId', 'requestDate', 'responseDate'];
	public pageSizeOptions = [10, 25, 50, 100];
	public resultsLength = 0;
	public logTableState = {
		skip: 0,
		take: 10
	} as LogTableState;

	public logQueryRuleState: LogQueryRuleSet;
	public isLoadingResults: boolean;
	public isRateLimitReached: boolean;
	public expandedElement: boolean;
	constructor(private showLogObjectsService: ShowLogObjectsService) { }
	private _onLoadData(dataState: LogTableState, logQueryRuleSet: LogQueryRuleSet) {
		this.isLoadingResults = true;
		this.showLogObjectsService.getAllLogs(dataState, logQueryRuleSet)
      .pipe(
			takeUntil(this._destroyed$),
			catchError(() => {
				this.isLoadingResults = false;
				this.isRateLimitReached = true;
				return of([]);
			})
      ).subscribe((logsData: LogsDataGrid) => {
			this.isLoadingResults = false;
			this.isRateLimitReached = false;
			this.dataSource = logsData.data;
			this.resultsLength = logsData.countLogs;
		});
	}

	public pageChanges(changeData: PageEvent) {
		const skip = changeData.pageIndex * changeData.pageSize;
		this.logTableState.take = changeData.pageSize;
		this.logTableState.skip = skip;
		this._onLoadData(this.logTableState, this.logQueryRuleState);
	}

	public getExpandTreeData(element: LogsDtoModel): LogTreeModel[] {
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
	public ngOnInit(): void {
		this.showLogObjectsService.loadDataWithFilter
			.pipe(takeUntil(this._destroyed$))
			.subscribe(queryState => {
				this.logQueryRuleState = queryState;
				this._onLoadData(this.logTableState, this.logQueryRuleState);
			});
	}
	public ngOnDestroy() {
		this._destroyed$.next(true);
		this._destroyed$.complete();
	}

}
