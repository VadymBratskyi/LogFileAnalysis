import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { LogsDataGrid, LogsDtoModel, LogTableState, LogTreeModel } from '@log_models';
import { ShowLogObjectsService } from '@log_services';
import { Observable, of, ReplaySubject } from 'rxjs';
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
export class LogObjectsTableComponent implements OnInit, OnDestroy  {

  private _destroyed$: ReplaySubject<boolean> = new ReplaySubject();
  private _expandableColumns = ['request', 'response'];

  public dataSource: LogsDtoModel[];
  public displayTableColumns = ['messageId','requestDate', 'responseDate'];
  public pageSizeOptions = [10, 25, 50, 100];
  public resultsLength = 0;
  public logTableState = {
    count: 0,
    skip: 0,
    take: 10
  } as LogTableState;

  public isLoadingResults: boolean;
  public isRateLimitReached: boolean;
  public expandedElement: boolean;
   
  constructor(private showLogObjectsService: ShowLogObjectsService) 
  { }

  public ngOnInit() {
    this.onLoadData();
  }

  private onLoadData() {
    this.isLoadingResults = true;
    this.showLogObjectsService.getAllLogs(this.logTableState)
      .pipe(
        takeUntil(this._destroyed$),
        catchError(() => {
          this.isLoadingResults = false;
          this.isRateLimitReached = true;
          return of([]);
        })
      )
      .subscribe((logsData: LogsDataGrid) => {
        this.isLoadingResults = false;
        this.dataSource = logsData.data;
        this.resultsLength = logsData.countLogs;
      });
  }

  public pageChanges(changeData: PageEvent) {
    this.logTableState.take = changeData.pageSize
    let skip = changeData.pageIndex * this.logTableState.take;
    this.logTableState.skip = skip;
    this.onLoadData();
  }

  public getExpandTreeData(element: LogsDtoModel): LogTreeModel[] {
    var treeModels: LogTreeModel[] = [];
    if(this._expandableColumns) {
      this._expandableColumns.forEach(column => {
        let treeModel = new LogTreeModel();
        let treeNode = {
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
    this._destroyed$.next(true);
    this._destroyed$.complete();
  }

}