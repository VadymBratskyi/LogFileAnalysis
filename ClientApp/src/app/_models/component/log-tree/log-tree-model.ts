import { Node } from './node';
import { LogTreeNode } from './log-tree-node';

export class LogTreeModel implements Node<LogTreeNode> {
    value: LogTreeNode;
    children: Node<LogTreeNode>[];
  }