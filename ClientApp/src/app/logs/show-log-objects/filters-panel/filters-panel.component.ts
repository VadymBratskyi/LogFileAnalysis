import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogQueryRuleSet, QueryConfig } from '@log_models';
import { ShowLogObjectsService } from '@log_services';
import { QueryBuilderConfig } from 'angular2-query-builder';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NewQueryDialogComponent, QuerySettingsItem } from '../new-query-dialog/new-query-dialog.component';

@Component({
	selector: 'app-filters-panel',
	templateUrl: './filters-panel.component.html',
	styleUrls: ['./filters-panel.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class FiltersPanelComponent implements OnInit {
	public isQueryBuilderCardExpanded: boolean;
	public destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>();
	public loadedConfig: boolean;
	private _existQueryConfigs: QueryConfig[];

	public config: QueryBuilderConfig = {
		fields: {}
	};
	constructor(	private dialog: MatDialog,
		public showLogObjectsService: ShowLogObjectsService
	) { }
	public ngOnInit() {
		this.onLoadData();
	}
	private getType(query: QueryConfig) {
		switch (query.type) {
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

	private createGonfig(query: any) {
		return {name: query.name, type: this.getType(query)};
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

	private _getLogQueryRules() {
		return this.showLogObjectsService.showLogQueryRules.rules.map(rule => {
			const conf = this._existQueryConfigs.find(query => query.key === rule.field);
			return conf ? {
				field: rule.field,
				operator: rule.operator,
				value: rule.value.toString(),
				objectType: conf.objectType,
				type: conf.type,
			} : null;
		});
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

	onFilterSettings() {
		const dialogRef = this.dialog.open(NewQueryDialogComponent, {
			data: {existQueries: this._existQueryConfigs}
		});
		dialogRef.afterClosed()
		.pipe(takeUntil(this.destroyed$))
		.subscribe((result: QuerySettingsItem[]) => {
			if (result) {
				const queryConfigs = result.map(item => {
					const query = new QueryConfig();
					query.key = item.queryPath;
					query.objectType = item.objectType;
					query.type = item.type;
					query.name = item.name;
					return query;
				});
				this.showLogObjectsService.addNewQueryDataConfig(queryConfigs)
				.pipe(takeUntil(this.destroyed$))
				.subscribe(result => {
					this.onLoadData();
				});
			}
      });
	}

	ngOnDestroy()  {
		this.destroyed$.next(true);
		this.destroyed$.complete();
	}
}
