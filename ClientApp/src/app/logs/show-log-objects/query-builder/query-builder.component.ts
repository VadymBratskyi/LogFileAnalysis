import { Component, OnDestroy } from '@angular/core';
import { ShowLogObjectsService } from '@log_services';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs';
import { QueryBuilderConfig } from 'angular2-query-builder';

@Component({
  selector: 'app-query-builder',
  templateUrl: './query-builder.component.html',
  styleUrls: ['./query-builder.component.scss']
})
export class QueryBuilderComponent implements OnDestroy {

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
