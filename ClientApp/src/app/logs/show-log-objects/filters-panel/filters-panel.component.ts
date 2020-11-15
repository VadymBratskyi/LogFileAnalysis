import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { QueryConfig } from '@log_models';
import { ShowLogObjectsService } from '@log_services';
import { QueryBuilderConfig, Rule, RuleSet } from 'angular2-query-builder';
import { strict } from 'assert';
import { config, ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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

  public config: QueryBuilderConfig = {
    fields: {
      age: {name: 'Age', type: 'number'},
      gender: {
        name: 'Gender',
        type: 'category',
        options: [
          {name: 'Male', value: 'm'},
          {name: 'Female', value: 'f'}
        ]
      }    
    },
  }

  constructor(
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
        return 'boolean'
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
      this.config.fields  = this.buildConfig(queryconfig);
    });
  }

  onRunFilter() {
    
  }

  onClearFilter() {
    
  }

  onAddFilter() {

  }

  ngOnDestroy()  {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }
}
