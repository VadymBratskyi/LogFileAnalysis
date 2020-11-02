export interface Node<T> {
    value: T;
    children: Node<T>[];
  }