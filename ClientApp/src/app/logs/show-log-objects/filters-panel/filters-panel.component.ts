import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ShowLogObjectsService } from '@log_services';
import { QueryBuilderConfig } from 'angular2-query-builder';
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
      // messageId: {name: 'MessageId', type: 'string'},     
      // requestDate: {name: 'RequestDate', type: 'date', operators: ['=', '<=', '>'],
      //   defaultValue: (() => new Date())
      // },
      // responseDate: {name: 'ResponseDate', type: 'date', operators: ['=', '<=', '>'],
      //   defaultValue: (() => new Date())
      // }      
    }
  }

  constructor(
    private showLogObjectsService: ShowLogObjectsService
  ) { }

  ngOnInit() {
    this.onLoadData();
  }

  private getType(query: any) {
    switch(query.logQueryType) {
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

  private buildConfig(queryconfig: any) {
    var conf = {};
    queryconfig.fields.forEach(element => {
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

  ngOnDestroy()  {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }



  // config: QueryBuilderConfig = {
  //   fields: {
  //     age: {name: 'Age', type: 'number'},
  //     gender: {
  //       name: 'Gender',
  //       type: 'category',
  //       options: [
  //         {name: 'Male', value: 'm'},
  //         {name: 'Female', value: 'f'}
  //       ]
  //     },
  //     name: {name: 'Name', type: 'string'},
  //     notes: {name: 'Notes', type: 'textarea', operators: ['=', '!=']},
  //     educated: {name: 'College Degree?', type: 'boolean'},
  //     birthday: {name: 'Birthday', type: 'date', operators: ['=', '<=', '>'],
  //       defaultValue: (() => new Date())
  //     },
  //     school: {name: 'School', type: 'string', nullable: true},
  //     occupation: {
  //       name: 'Occupation',
  //       type: 'multiselect',
  //       options: [
  //         {name: 'Student', value: 'student'},
  //         {name: 'Teacher', value: 'teacher'},
  //         {name: 'Unemployed', value: 'unemployed'},
  //         {name: 'Scientist', value: 'scientist'}
  //       ]
  //     }
  //   }
  // }
}
