import { Component, OnInit } from '@angular/core';
import { LogTableState, LogTableOptions } from '@log_models';
import { takeUntil } from 'rxjs/operators';
import { AnalysisLogObjectsService } from '@log_services';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-known-error-table',
  templateUrl: './known-error-table.component.html',
  styleUrls: ['./known-error-table.component.scss']
})
export class KnownErrorTableComponent implements OnInit {

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

  constructor(private analysisLogObjectsService: AnalysisLogObjectsService) 
  { }

  public ngOnInit() {
    this.onLoadData();
  }

  private onLoadData() {
    this.analysisLogObjectsService.getAllUnKnownErrorData(this.logTableOptions.logTableState)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((unKnownErrorsData: any) => {
          this.data = unKnownErrorsData.logData;
          this.logTableOptions.logTableState.count = unKnownErrorsData.countLogs;         
      });
  }


  public dataGridChanges(state: LogTableState) {
    this.logTableOptions.logTableState = state;
    this.onLoadData();
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
