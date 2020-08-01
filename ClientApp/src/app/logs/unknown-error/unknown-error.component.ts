import { Component, OnInit, OnDestroy } from '@angular/core';
import { LogTableOptions, LogTableState, LogsDataGrid, KnownErrorConfig } from '@log_models';
import { ErrorLogObjectsService } from '@log_services';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-unknown-error',
  templateUrl: './unknown-error.component.html',
  styleUrls: ['./unknown-error.component.scss']
})
export class UnknownErrorComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject();

  data: any[] = [ ];

  logTableOptions = {
    displayTableColumns: [ 'messageId', 'message', 'count' ],    
    pageSizeOptions: [10, 25, 50, 100],
    logTableState: {
      count: 0,
      skip: 0,
      take: 10
    }
  } as LogTableOptions;

  constructor(private errorLogObjectsService: ErrorLogObjectsService) 
  { }

  public ngOnInit() {
    this.onLoadData();
  }

  private onLoadData() {
    this.errorLogObjectsService.getAllUnKnownErrorData(this.logTableOptions.logTableState)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((unKnownErrorsData: LogsDataGrid) => {
          this.data = unKnownErrorsData.data;
          this.logTableOptions.logTableState.count = unKnownErrorsData.countLogs;         
      });
  }

  public dataGridChanges(state: LogTableState) {
    this.logTableOptions.logTableState = state;
    this.onLoadData();
  }

  public onSetKnowError(knownConfig: KnownErrorConfig) {
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
