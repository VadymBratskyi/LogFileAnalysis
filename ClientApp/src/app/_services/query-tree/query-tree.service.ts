import { Injectable } from '@angular/core';
import { LogObjectType, LogQuery, QueryBuilderConfig } from '@log_models';
import { TodoItemNode } from 'app/_models/component/query-tree/todo-item-node';
import { BehaviorSubject } from 'rxjs';
import { ShowLogObjectsService } from '../show-log-objects/show-log-objects.service';

@Injectable({
  providedIn: 'root'
})
export class QueryTreeService {
	dataChange = new BehaviorSubject<TodoItemNode[]>([]);
	constructor(
		private showLogObjectsService: ShowLogObjectsService
	) {
		this.initialize();
	}

	public initialize() {
		this.showLogObjectsService.getAccesQueryForConfig()
		.subscribe((accesQueries: QueryBuilderConfig) => {
			const data = this.buildTreeFields(accesQueries.fields);
			this.dataChange.next(data);
		});
	}

	public buildTreeFields(logQuery: LogQuery[], pathNode?: string): TodoItemNode[] {
		return logQuery.reduce<TodoItemNode[]>((accumulator, jobject) => {
			const node = new TodoItemNode();
			switch(jobject.objectType) {
				case LogObjectType.jobject:
					node.name = `${jobject.key} { }`;
					node.objectType = LogObjectType.jobject;
					break;
				case LogObjectType.jarray:
					node.name = `${jobject.key} [ ]`;
					node.objectType = LogObjectType.jarray;
					break;
				default:
					node.name = jobject.key;
					node.objectType = LogObjectType.none;
					break;
			}
			node.value = jobject.key;
			node.propertyType = jobject.propertyType;
			node.queryPath = pathNode ? `${pathNode}.${jobject.key}` : jobject.key;
			if (jobject.childrens.length > 0) {
			node.children = this.buildTreeFields(jobject.childrens, node.queryPath);
		}
			return accumulator.concat(node);
		}, []);
	}
}
