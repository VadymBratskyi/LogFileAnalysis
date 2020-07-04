import {NestedTreeControl} from '@angular/cdk/tree';
import {Component, Input, EventEmitter, Output} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { ErrorStatusesTreeModel, ErrorStatusesModel } from 'app/_models/component/error-stauses-tree';

@Component({
  selector: 'app-error-statuses-tree',
  templateUrl: './error-statuses-tree.component.html',
  styleUrls: ['./error-statuses-tree.component.scss']
})
export class ErrorStatusesTreeComponent { 

  @Input() dataSource = new MatTreeNestedDataSource<ErrorStatusesTreeModel>();

  @Output() selectedStatusItem = new EventEmitter<ErrorStatusesModel>();

  treeControl = new NestedTreeControl<ErrorStatusesTreeModel>(node => node.children);

  selectedNodes: ErrorStatusesModel[] = [];

  private _selectedItem(item: ErrorStatusesModel) {
    item.selected = true;
    this.selectedNodes.forEach(node => {
      node.selected = false;
    });
    this.selectedNodes = [];
    this.selectedNodes.push(item);
  }

  hasChild = (_: number, node: ErrorStatusesTreeModel) => !!node.children && node.children.length > 0;

  nodeItemClick(nodeModel: ErrorStatusesModel) {
    this._selectedItem(nodeModel);
    this.selectedStatusItem.emit(nodeModel);
  }
}
