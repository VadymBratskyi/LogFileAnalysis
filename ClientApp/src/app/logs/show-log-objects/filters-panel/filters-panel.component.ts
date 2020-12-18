import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogQueryRules, LogQueryRuleSet, QueryConfig, QuerySettingsItem } from '@log_models';
import { ShowLogObjectsService } from '@log_services';
import { QueryBuilderConfig } from 'angular2-query-builder';
import { ReplaySubject } from 'rxjs';
import { takeUntil, mergeMap } from 'rxjs/operators';
import { NewQueryDialogComponent } from '../new-query-dialog/new-query-dialog.component';

@Component({
	selector: 'app-filters-panel',
	templateUrl: './filters-panel.component.html',
	styleUrls: ['./filters-panel.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class FiltersPanelComponent implements OnInit {

	private _existQueryConfigs: QueryConfig[];
	public isQueryBuilderCardExpanded: boolean;
	public destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>();
	public loadedConfig: boolean;

	public config: QueryBuilderConfig = {
		fields: {}
	};
	constructor(	
		private dialog: MatDialog,
		public showLogObjectsService: ShowLogObjectsService
	) { }

	private _getType(query: QueryConfig) {
		switch (query.propertyType) {
			case 1:
			return 'string';
			case 2:
			return 'number';
			case 3:
			return 'boolean';
			case 4:
			return 'date';
			default:
			return 'string';
		}
	}

	private createGonfig(query: QueryConfig) {
		return {name: query.name, type: this._getType(query)};
	}

	private buildConfig(queryconfigs: QueryConfig[]) {
		const conf = {};
		queryconfigs.forEach(element => {
			conf[element.key] = this.createGonfig(element);
		});
		return conf;
	}

	public onLoadData() {
		this.loadedConfig = false;
		this.showLogObjectsService.getQueryDataConfig()
		.pipe(takeUntil(this.destroyed$))
		.subscribe(queryconfig => {
			this.loadedConfig = true;
			this._existQueryConfigs = queryconfig;
			this.config.fields = this.buildConfig(queryconfig);
		});
	}

	private _getQueryConfigs(queryItems: QuerySettingsItem[]): QueryConfig[] {
		if(!queryItems) {
			return [];
		}
		return queryItems.map(item => {
			return {
				key: item.queryPath,
				objectType: item.objectType,
				propertyType: item.propertyType,
				name: item.name
			} as QueryConfig;
		});
	}

	private _getLogQueryRules(): LogQueryRules[] {
		return this.showLogObjectsService.showLogQueryRules.rules.map(rule => {
			const conf = this._existQueryConfigs.find(query => query.key === rule.field);
			return conf ? {
				field: rule.field,
				operator: rule.operator,
				value: rule.value.toString(),
				objectType: conf.objectType,
				propertyType: conf.propertyType,
			} as LogQueryRules : null;
		});
	}

	public ngOnInit() {
		this.onLoadData();
	}

	public onRunFilter() {
		const runFilter = {
			condition: this.showLogObjectsService.showLogQueryRules.condition,
			rules: this._getLogQueryRules()
		} as LogQueryRuleSet;
		this.showLogObjectsService.loadDataWithFilter.emit(runFilter);
	}

	public onClearFilter() {
		this.showLogObjectsService.showLogQueryRules.rules = [];
	}

	public onFilterSettings() {
		const dialogRef = this.dialog.open(NewQueryDialogComponent, {
			data: {existQueries: this._existQueryConfigs}
		});
		dialogRef.afterClosed()
		.pipe(
			takeUntil(this.destroyed$),
			mergeMap((queryItems: QuerySettingsItem[]) => {
			const queryConfigs = this._getQueryConfigs(queryItems);
			return this.showLogObjectsService.addNewQueryDataConfig(queryConfigs)
		}))
		.subscribe((result: QuerySettingsItem[]) => {
			this.onLoadData();
      });
	}

	ngOnDestroy()  {
		this.destroyed$.next(true);
		this.destroyed$.complete();
	}
}
