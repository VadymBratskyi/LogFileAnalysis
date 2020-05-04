import { LogTreeNode } from './log-tree-node';
import { Node } from 'ng-material-treetable';

export class LogTreeModel implements Node<LogTreeNode> {
    value: LogTreeNode;
    children: Node<LogTreeNode>[];
  }