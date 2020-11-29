import { NestedTreeControl } from '@angular/cdk/tree';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { LogTreeModel } from '@log_models';

@Component({
  selector: 'app-log-tree-table',
  templateUrl: './log-tree-table.component.html',
  styleUrls: ['./log-tree-table.component.scss']
})
export class LogTreeTableComponent implements OnChanges {
  
  @Input() treeDataSource: LogTreeModel[];

  treeControl = new NestedTreeControl<LogTreeModel>(node => node.children);
  dataSource = new MatTreeNestedDataSource<LogTreeModel>();

  ngOnChanges(changes: SimpleChanges) {
    if(this.dataSource.data.length == 0) {this.dataSource.data = this.treeDataSource;}    
  }

  hasChild = (_: number, node: LogTreeModel) => !!node.children && node.children.length > 0;

}