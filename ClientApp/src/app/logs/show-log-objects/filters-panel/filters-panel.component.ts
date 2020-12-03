import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QueryConfig } from '@log_models';
import { ShowLogObjectsService } from '@log_services';
import { QueryBuilderConfig, Rule, RuleSet } from 'angular2-query-builder';
import { strict } from 'assert';
import { config, ReplaySubject } from 'rxjs';
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

  private _queryConfigs: QueryConfig[];

  public config: QueryBuilderConfig = {
    fields: {}
  };

  constructor(
    private dialog: MatDialog,
    private showLogObjectsService: ShowLogObjectsService
  ) { }

  ngOnInit() {
    this.onLoadData();
  }

  private getType(query: QueryConfig) {
    switch(query.type) {
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
    return {name: query.key, type: this.getType(query)};
  }

  private buildConfig(queryconfigs: QueryConfig[]) {
    var conf = {};
    queryconfigs.forEach(element => {
      conf[element.key.toLocaleLowerCase()] = this.createGonfig(element);
    });
    return conf;
  }

  onLoadData() {
    this.loadedConfig = false;
    this.showLogObjectsService.getQueryDataConfig()
    .pipe(takeUntil(this.destroyed$))
    .subscribe(queryconfig => {
		this.loadedConfig = true;
		this._queryConfigs = queryconfig;
  this.config.fields  = this.buildConfig(queryconfig);
    });
  }

  onRunFilter() {
	this.showLogObjectsService.runLogsFilter()
	.pipe(takeUntil(this.destroyed$))
	.subscribe(data => {
		console.log(data);
	});
  }

  onClearFilter() {
    
  }

  onFilterSettings() {
      const dialogRef = this.dialog.open(NewQueryDialogComponent, {
        data: {existQueries: this._queryConfigs}
      });
		    dialogRef.afterClosed()
		.pipe(takeUntil(this.destroyed$))
		.subscribe((result: QuerySettingsItem[]) => {
			if(result) {
				const queryConfigs = result.map(item => {
					const query = new QueryConfig();
					query.key = item.name;
					query.type = item.type;
					query.name = item.queryPath;
					return query;
				});
				this.showLogObjectsService.addNewQueryDataConfig(queryConfigs)
				.pipe(takeUntil(this.destroyed$))
				.subscribe(result => {
					console.log(result, 'success');
				});
			}
      });
  }

  ngOnDestroy()  {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
