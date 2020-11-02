import { Node } from '../log-tree/node';
import { ErrorStatusesModel } from './error-statuses-model';

export class ErrorStatusesTreeModel implements Node <ErrorStatusesModel> {
  public value: ErrorStatusesModel;
  public children: Node<ErrorStatusesModel>[];
}