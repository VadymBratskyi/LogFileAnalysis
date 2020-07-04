import { ErrorStatusesModel } from './error-statuses-model';
import { Node } from 'ng-material-treetable';

export class ErrorStatusesTreeModel implements Node<ErrorStatusesModel> {
  public value: ErrorStatusesModel;
  public children: Node<ErrorStatusesModel>[];
}