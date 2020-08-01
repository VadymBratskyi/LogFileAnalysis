import { Component } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { LogsDataGrid, LogTableOptions } from '@log_models';
import { ErrorLogObjectsService } from '@log_services';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-known-error',
  templateUrl: './known-error.component.html',
  styleUrls: ['./known-error.component.scss']
})
export class KnownErrorComponent {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject();

  data: any[] = [ ];

  logTableOptions = {
    displayTableColumns: [ 'countFounded', 'message' ],    
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
    this.errorLogObjectsService.getAllKnownErrorData(this.logTableOptions.logTableState)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((knownErrorsData: LogsDataGrid) => {
        console.log(knownErrorsData)
          // this.data = unKnownErrorsData.data;
          // this.logTableOptions.logTableState.count = unKnownErrorsData.countLogs;         
      });
  }

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }


}
