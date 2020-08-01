import { Component, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { LogTableOptions, LogTableState, KnownErrorConfig } from '@log_models';

@Component({
  selector: 'app-error-table',
  templateUrl: './error-table.component.html',
  styleUrls: ['./error-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ErrorTableComponent {

  @Input() dataSource: any[];

  @Input() logTableOptions: LogTableOptions;
  
  @Output() dataChanges = new EventEmitter<LogTableState>();

  @Output() setAnswer = new EventEmitter<KnownErrorConfig>();

  public expandedElement: boolean;

  public get tableState(): LogTableState {
    if(this.logTableOptions && this.logTableOptions.logTableState) {
      return this.logTableOptions.logTableState;
    }
  }

  public get pageSizeOptions() : number[] {
    if(this.logTableOptions && this.logTableOptions.pageSizeOptions) {
      return this.logTableOptions.pageSizeOptions;
    }
  }

  public pageChanges(changeData: PageEvent) {
    this.logTableOptions.logTableState.take = changeData.pageSize
    let skip = changeData.pageIndex * this.logTableOptions.logTableState.take;
    this.logTableOptions.logTableState.skip = skip;
    this.dataChanges.emit(this.logTableOptions.logTableState);
  }

  public onSaveErrorSettings(config: KnownErrorConfig) {
    this.setAnswer.emit(config);
  }

}
