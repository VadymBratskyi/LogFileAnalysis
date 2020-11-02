import {NestedTreeControl} from '@angular/cdk/tree';
import {Component, Input, EventEmitter, Output} from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';
import { ErrorStatusesTreeModel, ErrorStatusesModel } from '@log_models';

@Component({
  selector: 'app-error-statuses-tree',
  templateUrl: './error-statuses-tree.component.html',
  styleUrls: ['./error-statuses-tree.component.scss']
})
export class ErrorStatusesTreeComponent { 

  @Input() dataSource = new MatTreeNestedDataSource<ErrorStatusesTreeModel>();

  @Output() selectedStatusItem = new EventEmitter<ErrorStatusesModel>();

  treeControl = new NestedTreeControl<ErrorStatusesTreeModel>(node => node.children);

  selectedNode: ErrorStatusesModel;

  private _selectedItem(item: ErrorStatusesModel) {    
    if(this.selectedNode) {
      this.selectedNode.selected = false;
    }
    item.selected = true;
    this.selectedNode = item;
  }

  hasChild = (_: number, node: ErrorStatusesTreeModel) => !!node.children && node.children.length > 0;

  nodeItemClick(nodeModel: ErrorStatusesModel) {
    this._selectedItem(nodeModel);
    this.selectedStatusItem.emit(nodeModel);
  }
}
