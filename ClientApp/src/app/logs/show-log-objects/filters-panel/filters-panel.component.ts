import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ShowLogObjectsService } from '@log_services';
import { QueryBuilderConfig } from 'angular2-query-builder';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-filters-panel',
  templateUrl: './filters-panel.component.html',
  styleUrls: ['./filters-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FiltersPanelComponent {

  public isQueryBuilderCardExpanded: boolean;

  public destroyed$: ReplaySubject<boolean> = new ReplaySubject<boolean>(); 

  config: QueryBuilderConfig = {
    fields: {
      messageId: {name: 'MessageId', type: 'string'},     
      requestDate: {name: 'RequestDate', type: 'date', operators: ['=', '<=', '>'],
        defaultValue: (() => new Date())
      },
      responseDate: {name: 'ResponseDate', type: 'date', operators: ['=', '<=', '>'],
        defaultValue: (() => new Date())
      }      
    }
  }

  constructor(
    private showLogObjectsService: ShowLogObjectsService
  ) { }

  onLoadData() {
    this.showLogObjectsService.getTreeData()
    .pipe(takeUntil(this.destroyed$))
    .subscribe(dataTree => {
      console.log(dataTree);
      alert("success");
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
