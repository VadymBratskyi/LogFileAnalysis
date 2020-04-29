import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { LogTableState, LogTableOptions, LogsDtoModel } from '@log_models';
import { PageEvent } from '@angular/material';
import { Node, Options } from 'ng-material-treetable';


@Component({
  selector: 'app-log-table',
  templateUrl: './log-table.component.html',
  styleUrls: ['./log-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class LogTableComponent implements OnInit {

  @Input() dataSource: any[];

  @Input() logTableOptions: LogTableOptions;
  
  @Output() dataChanges = new EventEmitter<LogTableState>();

  get displayColumn(): string[] {
    if(this.dataSource && this.dataSource.length > 0) {
      let keys = Object.keys(this.dataSource[0]);
      return keys.filter(k => {
          let index = this.logTableOptions.displayTableColumns.findIndex(o => o == k);
          if(index >= 0) {
            return k;
          }
      });
    }
  }

  get tableState(): LogTableState {
    if(this.logTableOptions && this.logTableOptions.logTableState) {
      return this.logTableOptions.logTableState;
    }
  }

  get pageSizeOptions() {
    if(this.logTableOptions && this.logTableOptions.pageSizeOptions) {
      return this.logTableOptions.pageSizeOptions;
    }
  }

  constructor() { }

  ngOnInit() {
   
  }

  public pageChanges(changeData: PageEvent) {
    this.logTableOptions.logTableState.take = changeData.pageSize
    let skip = changeData.pageIndex * this.logTableOptions.logTableState.take;
    this.logTableOptions.logTableState.skip = skip;
    this.dataChanges.emit(this.logTableOptions.logTableState);
  }

  
  treeOptions: Options<any> = {
    customColumnOrder: [
      'key', 'value'
    ]
  };
  
  singleRootTree: Node<any>[] = 
  [
    {
    value: {
      key: 'Reports',
      value: 'Eric'
    },
    children: [
      {
        value: {
          key: 'Charts',
          value: 'Stephanie',
        },
        children: []
      },
      {
        value: {
          key: 'Sales',
          value: 'Virginia',
        },
        children: []
      },
      {
        value: {
          key: 'US',
          value: 'Alison',
        },
        children: [
          {
            value: {
              key: 'California',
              value: 'Claire',
            },
            children: []
          },
          {
            value: {
              key: 'Washington',
              value: 'Colin',
            },
            children: [
              {
                value: {
                  key: 'Domestic',
                  value: 'Oliver',
                },
                children: []
              },
              {
                value: {
                  key: 'International',
                  value: 'Oliver',
                },
                children: []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    value: {
      key: 'Reports2',
      value: 'Eric'
    },
    children: [
      {
        value: {
          key: 'Charts',
          value: 'Stephanie',
        },
        children: []
      },
      {
        value: {
          key: 'Sales',
          value: 'Virginia',
        },
        children: []
      },
      {
        value: {
          key: 'US',
          value: 'Alison',
        },
        children: [
          {
            value: {
              key: 'California',
              value: 'Claire',
            },
            children: []
          },
          {
            value: {
              key: 'Washington',
              value: 'Colin',
            },
            children: [
              {
                value: {
                  key: 'Domestic',
                  value: 'Oliver',
                },
                children: []
              },
              {
                value: {
                  key: 'International',
                  value: 'Oliver',
                },
                children: []
              }
            ]
          }
        ]
      }
    ]
  }
]

}
