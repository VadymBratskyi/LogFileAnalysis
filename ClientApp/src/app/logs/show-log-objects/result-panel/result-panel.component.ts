import { Component, OnInit, OnDestroy } from '@angular/core';
import { LogsDtoModel, LogTableState, LogsDataGrid } from '@log_models';

import { ShowLogObjectsService } from '@log_services';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { LogTableOptions } from 'app/_models/component/log-table/log-table-options';

@Component({
  selector: 'app-result-panel',
  templateUrl: './result-panel.component.html',
  styleUrls: ['./result-panel.component.scss'],
})
export class ResultPanelComponent implements OnInit, OnDestroy {

  private destroyed$: ReplaySubject<boolean> = new ReplaySubject();

  data: LogsDtoModel[];

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
    private showLogObjectsService: ShowLogObjectsService
  ) { }

  public ngOnInit() {
    this.onLoadData();
  }
 
  private onLoadData() {
    this.showLogObjectsService.getAllLogs(this.logTableOptions.logTableState)
      .pipe(takeUntil(this.destroyed$))
      .subscribe((logsData:LogsDataGrid) => {
          this.data = logsData.data;
          this.logTableOptions.logTableState.count = logsData.countLogs;         
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
