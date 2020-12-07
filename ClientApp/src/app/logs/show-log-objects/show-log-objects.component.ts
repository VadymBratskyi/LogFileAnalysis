import { Component, OnDestroy } from '@angular/core';
import { LogsDataGrid, LogsDtoModel, LogTableState } from '@log_models';
import { ShowLogObjectsService } from '@log_services';
import { of, ReplaySubject } from 'rxjs';
import { catchError, takeUntil } from 'rxjs/operators';
import { LogQueryRuleSet } from './filters-panel/filters-panel.component';

@Component({
  selector: 'app-show-log-objects',
  templateUrl: './show-log-objects.component.html',
  styleUrls: ['./show-log-objects.component.scss']
})
export class ShowLogObjectsComponent implements OnDestroy {
  
	private _destroyed$: ReplaySubject<boolean> = new ReplaySubject();
	
	public data: LogsDtoModel[];
	constructor(private showLogObjectsService: ShowLogObjectsService) { }

	private onLoadData(dataState: LogTableState) {
		// this.isLoadingResults = true;
		this.showLogObjectsService.getAllLogs(dataState)
      .pipe(
			takeUntil(this._destroyed$),
			catchError(() => {
				// this.isLoadingResults = false;
				// this.isRateLimitReached = true;
				return of([]);
			})
      )
      .subscribe((logsData: LogsDataGrid) => {
			// this.isLoadingResults = false;
			this.data = logsData.data;
			// this.resultsLength = logsData.countLogs;
		});
	}

	public onDataChanges(logDataState: LogTableState) {
		this.onLoadData(logDataState);
	}

	public onRunFilter(logQueryRuleSet: LogQueryRuleSet) {
		let st = {
			count: 0,
			skip: 0,
			take: 10
		} as LogTableState;
		this.onLoadData(st);
	}

	ngOnDestroy() {
		this._destroyed$.next(true);
		this._destroyed$.complete();
	}

  // logTableOptions = {
  //   displayTableColumns: ['messageId','requestDate', 'responseDate'],
  //   expandableColumns: ['request', 'response'],
  //   pageSizeOptions: [10, 25, 50, 100],
  //   logTableState: {
  //     count: 0,
  //     skip: 0,
  //     take: 10
  //   }
  // } as LogTableOptions;



  // this.showLogObjectsService.runLogsFilter(this.queryRules)
		// .pipe(takeUntil(this.destroyed$))
		// .subscribe(data => {
		// 	console.log(data);
		// });
}
