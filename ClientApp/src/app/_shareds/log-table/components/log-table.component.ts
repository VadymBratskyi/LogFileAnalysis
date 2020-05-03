import { Component, Input, Output, EventEmitter } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LogTableState, LogTableOptions, LogTreeNode, LogTreeModel } from '@log_models';
import { PageEvent } from '@angular/material';
import { Options, Node } from 'ng-material-treetable';


@Component({
  selector: 'app-log-table',
  templateUrl: './log-table.component.html',
  styleUrls: ['./log-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class LogTableComponent {

  @Input() dataSource: any[];

  @Input() logTableOptions: LogTableOptions;
  
  @Output() dataChanges = new EventEmitter<LogTableState>();

  public get displayColumn(): string[] {
    if(this.dataSource && this.dataSource.length > 0) {
      let keys = Object.keys(this.dataSource[0]);
      return keys.filter(k => {
          let index = this.logTableOptions.displayTableColumns.findIndex(o => o == k);
          if(index >= 0) {
            return k;
          }
      });
    }
  }

  public get tableState(): LogTableState {
    if(this.logTableOptions && this.logTableOptions.logTableState) {
      return this.logTableOptions.logTableState;
    }
  }

  public getExpandTreeData(elemnt: any) {
    var treeModels: LogTreeModel[] = [];        
    this.logTableOptions.expandableColumns.forEach(column => {
      let treeModel = new LogTreeModel();
      let treeNode = {
        key: column,
        value: JSON.stringify(elemnt[column])
      };      
      treeModel.value = treeNode;
      treeModel.children = elemnt[column];      
      treeModels.push(treeModel);
    });
    return treeModels;
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
  
  public treeOptions: Options<any> = {
    customColumnOrder: [
      'key', 'value'
    ]
  };

}
