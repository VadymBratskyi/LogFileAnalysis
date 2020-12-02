import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Inject, Injectable, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { JObjectType, LogQuery, QueryBuilderConfig } from '@log_models';
import { ShowLogObjectsService } from '@log_services';
import { BehaviorSubject, ReplaySubject } from 'rxjs';
import { difference } from 'lodash';
import { FormGroup } from '@angular/forms';

export class TodoItemNode {
	children: TodoItemNode[];
	item: string;
	value: string;
	jObjectType: JObjectType;
	path: string;
}

export class TodoItemFlatNode {
	item: string;
	value: string;
	level: number;
	expandable: boolean;
	objectType: JObjectType;
	path: string;
}

export class QuerySettingsItem {
	public name: string;
	public queryPath: string;

	constructor(path: string) {
		this.queryPath = path;
		this.name = '';
	}

}

@Injectable()
	export class ChecklistDatabase {
	dataChange = new BehaviorSubject<TodoItemNode[]>([]);

	constructor(
		private showLogObjectsService: ShowLogObjectsService
	) {
		this.initialize();
	}

	initialize() {
		this.showLogObjectsService.getAccesQueryForConfig()
		.subscribe((accesQueries: QueryBuilderConfig) => {
			const data = this.buildTreeFields(accesQueries.fields);
			this.dataChange.next(data);
		});
	}

	buildTreeFields(logQuery: LogQuery[], parentName?: string, pathNode?: string): TodoItemNode[] {
		return logQuery.reduce<TodoItemNode[]>((accumulator, jobject) => {
			const node = new TodoItemNode();
			switch(jobject.objectType) {
				case JObjectType.jobject:
					node.item = `${jobject.key} { }`;
					node.jObjectType = JObjectType.jobject;
					break;
				case JObjectType.jarray:
					node.item = `${jobject.key} [ ]`;
					node.jObjectType = JObjectType.jarray;
					break;
				default:
					node.item = jobject.key;
					node.jObjectType = JObjectType.none;
					break;
			}
			node.value = jobject.key;
			node.path = pathNode ? `${pathNode}.${jobject.key}` : jobject.key;
			if (jobject.childrens.length > 0) {
			node.children = this.buildTreeFields(jobject.childrens, jobject.key, node.path);
		}
			return accumulator.concat(node);
		}, []);
	}

}

@Component({
	selector: 'app-new-query-dialog',
	templateUrl: './new-query-dialog.component.html',
	styleUrls: ['./new-query-dialog.component.scss'],
	providers: [ChecklistDatabase]
})
	export class NewQueryDialogComponent implements OnInit {

	private destroyed$: ReplaySubject<boolean> = new ReplaySubject();

	constructor(
		private _database: ChecklistDatabase,
		public dialogRef: MatDialogRef<NewQueryDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any) {

		this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
			this.isExpandable, this.getChildren);
		this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
		this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

	}

	onNoClick(): void {
		this.dialogRef.close();
	}

	ngOnInit(): void {
		this._database.dataChange.subscribe(data => {
		this.dataSource.data = data;
		});
	}

	ngOnDestroy() {
		this.destroyed$.next(true);
		this.destroyed$.complete();
	}


	/** Map from flat node to nested node. This helps us finding the nested node to be modified */
	flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

	/** Map from nested node to flattened node. This helps us to keep the same object for selection */
	nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

	/** A selected parent node to be inserted */
	// selectedParent: TodoItemFlatNode | null = null;

	/** The new item's name */
	// newItemName = '';

	treeControl: FlatTreeControl<TodoItemFlatNode>;

	treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

	dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

	/** The selection for checklist */
	checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

	queriesToSettins: QuerySettingsItem[] = [];

	getLevel = (node: TodoItemFlatNode) => node.level;

	isExpandable = (node: TodoItemFlatNode) => node.expandable;

	getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

	hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

	get isNotValidSettings(): boolean {
		return this.queriesToSettins.length === 0 ||
		this.queriesToSettins.findIndex(model => model.name === '') >= 0;
	}

	// hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';

	/**
		* Transformer to convert nested node to flat node. Record the nodes in maps for later use.
		*/
	transformer = (node: TodoItemNode, level: number) => {
		const existingNode = this.nestedNodeMap.get(node);
		const flatNode = existingNode && existingNode.item === node.item
			? existingNode
			: new TodoItemFlatNode();
		flatNode.item = node.item;
		flatNode.level = level;
		flatNode.value = node.value;
		flatNode.objectType = node.jObjectType;
		flatNode.path = node.path;
		flatNode.expandable = !!node.children?.length;
		this.flatNodeMap.set(flatNode, node);
		this.nestedNodeMap.set(node, flatNode);
		return flatNode;
	}

	/** Whether all the descendants of the node are selected. */
	descendantsAllSelected(node: TodoItemFlatNode): boolean {
		const descendants = this.treeControl.getDescendants(node);
		const descAllSelected = descendants.length > 0 && descendants.every(child => {
		return this.checklistSelection.isSelected(child);
		});
		return descAllSelected;
	}

	/** Whether part of the descendants are selected */
	descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
		const descendants = this.treeControl.getDescendants(node);
		const result = descendants.some(child => this.checklistSelection.isSelected(child));
		return result && !this.descendantsAllSelected(node);
	}

	private _buildQuerySettings(isSelected: boolean) {
		const selectedItems = this.checklistSelection.selected;
		if (isSelected) {
			selectedItems.filter(selectedModel => selectedModel.objectType !== JObjectType.jobject).forEach(item => {
				const selectedExistIndex = this.queriesToSettins.findIndex(query => query.queryPath === item.path);
				if (selectedExistIndex < 0) {
					this.queriesToSettins.push(new QuerySettingsItem(item.path));
				}
			});
		} else {
			const unselectedItems = this.queriesToSettins.filter(query => selectedItems.findIndex(model => model.path === query.queryPath) === -1);
			unselectedItems.forEach(unSelectedModel => {
				const unselectedExistIndex = this.queriesToSettins.findIndex(query => query.queryPath === unSelectedModel.queryPath);
				if (unselectedExistIndex >= 0) {
					this.queriesToSettins.splice(unselectedExistIndex, 1);
				}
			});
		}
		
	}

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
	todoItemSelectionToggle(node: TodoItemFlatNode): void {
		this.checklistSelection.toggle(node);
		const descendants = this.treeControl.getDescendants(node);
		const isSelected = this.checklistSelection.isSelected(node);
		isSelected ? this.checklistSelection.select(...descendants)
		: this.checklistSelection.deselect(...descendants);

	 // Force update for the parent
	descendants.forEach(child => this.checklistSelection.isSelected(child));
		this.checkAllParentsSelection(node);
		this._buildQuerySettings(isSelected);
}

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
	todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
		this.checklistSelection.toggle(node);
		this.checkAllParentsSelection(node);
		this._buildQuerySettings(this.checklistSelection.isSelected(node));
	}


	/* Checks all the parents when a leaf node is selected/unselected */
	checkAllParentsSelection(node: TodoItemFlatNode): void {
		let query = {
			key : node.value,
			parents : []
		}
		let parent: TodoItemFlatNode | null = this.getParentNode(node);
		while (parent) {
		query.parents.unshift(parent.value);
		this.checkRootNodeSelection(parent);
		parent = this.getParentNode(parent);
		}

	}

  /** Check root node checked state and change it accordingly */
	checkRootNodeSelection(node: TodoItemFlatNode): void {  
		const nodeSelected = this.checklistSelection.isSelected(node);
		const descendants = this.treeControl.getDescendants(node);
		const descAllSelected = descendants.length > 0 && descendants.every(child => {
		return this.checklistSelection.isSelected(child);
		});
		if (nodeSelected && !descAllSelected) {
		this.checklistSelection.deselect(node);
		} else if (!nodeSelected && descAllSelected) {
		this.checklistSelection.select(node);
		}
	}

  /* Get the parent node of a node */
	getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
		const currentLevel = this.getLevel(node);

		if (currentLevel < 1) {
		return null;
		}

		const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

		for (let i = startIndex; i >= 0; i--) {
		const currentNode = this.treeControl.dataNodes[i];

		if (this.getLevel(currentNode) < currentLevel) {
			return currentNode;
		}
		}
		return null;
	}
}
