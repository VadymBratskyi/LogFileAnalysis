import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { AnalysisLogObjectsService } from '@log_services';
import { takeUntil } from 'rxjs/operators';
import { LogTableOptions } from '@log_models';

@Component({
  selector: 'app-unknown-error',
  templateUrl: './unknown-error.component.html',
  styleUrls: ['./unknown-error.component.scss']
})
export class UnknownErrorComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject();

  logTableOptions = {
    displayTableColumns: ['messageId','requestDate', 'responseDate'],
    expandableColumns: ['request', 'response'],
    pageSizeOptions: [10, 25, 50, 100],
    logTableState: {
      count: 0,
      skip: 0,
      take: 10
    }
  } as LogTableOptions;

  constructor(
    private analysisLogObjectsService: AnalysisLogObjectsService
    ) { }

  ngOnInit() {
    this.onLoadData();
  }

  private onLoadData() {
    this.analysisLogObjectsService.getAllUnKnownErrorData(this.logTableOptions.logTableState)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((unKnownErrorsData: any) => {
        console.log(unKnownErrorsData);
          // this.data = logsData.logData;
          // this.logTableOptions.logTableState.count = logsData.countLogs;         
      });
  }


  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

}
