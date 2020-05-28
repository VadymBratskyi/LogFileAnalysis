import { Component, OnInit, Input } from '@angular/core';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';
import { LogTreeModel } from '@log_models';

@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.scss']
})
export class TreeTableComponent implements OnInit {

  @Input() treeDataSource: any[];

  public data = new MatTreeNestedDataSource<LogTreeModel>();

  @Input() options: any;

  treeControl = new NestedTreeControl<LogTreeModel>(node => node.children);

  constructor() { }

  ngOnInit(): void {
    this.data.data = this.treeDataSource;
    console.log(this.treeDataSource)
  }

  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;

}
