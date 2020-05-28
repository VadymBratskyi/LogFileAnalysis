import { Component, OnInit } from '@angular/core';
import { LogTableOptions, LogTableState } from '@log_models';

@Component({
  selector: 'app-error-table',
  templateUrl: './error-table.component.html',
  styleUrls: ['./error-table.component.scss']
})
export class ErrorTableComponent implements OnInit {

  data: any[] = [
    { countFounded: 77, errorText: 'lalal eror' },
    { countFounded: 160, errorText: 'rnk eror' }
  ];

  logTableOptions = {
    displayTableColumns: ['countFounded','errorText'],    
    pageSizeOptions: [10, 25, 50, 100],
    logTableState: {
      count: 0,
      skip: 0,
      take: 10
    }
  } as LogTableOptions;

  constructor() { }

  ngOnInit(): void {
  }

  public onLoadData() {
    
  }

  public dataGridChanges(state: LogTableState) {
    this.logTableOptions.logTableState = state;
    this.onLoadData();
  }


}
