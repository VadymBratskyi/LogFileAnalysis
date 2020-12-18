import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { LogObjectType, QueryConfig, QuerySettingsItem } from '@log_models';
import { TodoItemFlatNode } from 'app/_models/component/query-tree/todo-item-flat-node';
import { TodoItemNode } from 'app/_models/component/query-tree/todo-item-node';
import { QueryTreeService } from 'app/_services/query-tree/query-tree.service';
import { ReplaySubject } from 'rxjs';

@Component({
	selector: 'app-new-query-dialog',
	templateUrl: './new-query-dialog.component.html',
	styleUrls: ['./new-query-dialog.component.scss'],
})
	export class NewQueryDialogComponent implements OnInit {
	private destroyed$: ReplaySubject<boolean> = new ReplaySubject();
	constructor(
		private _queryTreeService: QueryTreeService,
		public dialogRef: MatDialogRef<NewQueryDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any) {
		this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
			this.isExpandable, this.getChildren);
		this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
		this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
	}

	public onNoClick(): void {
		this.dialogRef.close();
	}

	private disableExistItems(existQueries: QueryConfig[], queryNodes: TodoItemNode[]) {
		queryNodes.forEach(item => {
			const existIndex = existQueries.findIndex(config => config.key === item.queryPath);
			if(existIndex >= 0) {
				item.isExistQuery = true;
			}
			if (item.children && item.children.length > 0) {
				this.disableExistItems(existQueries, item.children);
			}
		});
	}
	ngOnInit(): void {
		this._queryTreeService.dataChange.subscribe((data: TodoItemNode[]) => {
			const existQueries = this.data.existQueries;
			this.disableExistItems(existQueries, data);
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
		const flatNode = existingNode && existingNode.name === node.name
			? existingNode
			: new TodoItemFlatNode();
		flatNode.name = node.name;
		flatNode.level = level;
		flatNode.value = node.value;
		flatNode.isExistQuery = node.isExistQuery;
		flatNode.objectType = node.objectType;
		flatNode.queryPath = node.queryPath;
		flatNode.propertyType = node.propertyType;
		flatNode.expandable = !!node.children?.length;
		this.flatNodeMap.set(flatNode, node);
		this.nestedNodeMap.set(node, flatNode);
		return flatNode;
	}

	/** Whether all the descendants of the node are selected. */
	public descendantsAllSelected(node: TodoItemFlatNode): boolean {
		const descendants = this.treeControl.getDescendants(node);
		const descAllSelected = descendants.length > 0 && descendants.every(child => {
		return this.checklistSelection.isSelected(child);
		});
		return descAllSelected;
	}

	/** Whether part of the descendants are selected */
	public descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
		const descendants = this.treeControl.getDescendants(node);
		const result = descendants.some(child => this.checklistSelection.isSelected(child));
		return result && !this.descendantsAllSelected(node);
	}

	private _buildQuerySettings(isSelected: boolean) {
		const selectedItems = this.checklistSelection.selected;
		if (isSelected) {
			selectedItems.filter(selectedModel => selectedModel.objectType !== LogObjectType.jobject).forEach(item => {
				const selectedExistIndex = this.queriesToSettins.findIndex(query => query.queryPath === item.queryPath);
				if (selectedExistIndex < 0 && !item.isExistQuery) {
					this.queriesToSettins.push({
						queryPath: item.queryPath,
						propertyType: item.propertyType,
						objectType: item.objectType,
						name: ''
					} as QuerySettingsItem);
				}
			});
		} else {
			const unselectedItems = this.queriesToSettins.filter(query => selectedItems.findIndex(model => model.queryPath === query.queryPath) === -1);
			unselectedItems.forEach(unSelectedModel => {
				const unselectedExistIndex = this.queriesToSettins.findIndex(query => query.queryPath === unSelectedModel.queryPath);
				if (unselectedExistIndex >= 0) {
					this.queriesToSettins.splice(unselectedExistIndex, 1);
				}
			});
		}
		
	}

  /** Toggle the to-do item selection. Select/deselect all the descendants node */
	public todoItemSelectionToggle(node: TodoItemFlatNode): void {
		this.checklistSelection.toggle(node);
		const descendants = this.treeControl.getDescendants(node);
		const isSelected = this.checklistSelection.isSelected(node);
		isSelected ? this.checklistSelection.select(...descendants)
		: this.checklistSelection.deselect(...descendants);

	 // Force update for the parent
	descendants.forEach(child => this.checklistSelection.isSelected(child));
		this._checkAllParentsSelection(node);
		this._buildQuerySettings(isSelected);
}

  /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
	public todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
		this.checklistSelection.toggle(node);
		this._checkAllParentsSelection(node);
		this._buildQuerySettings(this.checklistSelection.isSelected(node));
	}


	/* Checks all the parents when a leaf node is selected/unselected */
	private _checkAllParentsSelection(node: TodoItemFlatNode): void {
		let query = {
			key : node.value,
			parents : []
		}
		let parent: TodoItemFlatNode | null = this._getParentNode(node);
		while (parent) {
			query.parents.unshift(parent.value);
			this._checkRootNodeSelection(parent);
			parent = this._getParentNode(parent);
		}

	}

  /** Check root node checked state and change it accordingly */
	private _checkRootNodeSelection(node: TodoItemFlatNode): void {  
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
	private _getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
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
