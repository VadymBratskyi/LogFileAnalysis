import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-inner-table',
  templateUrl: './inner-table.component.html',
  styleUrls: ['./inner-table.component.scss']
})
export class InnerTableComponent implements OnInit {

  @Input() data: any;

  constructor() { }

  ngOnInit(): void {
    this.dataSource = [this.data];
  }

  displayedColumns: string[] = ['key', 'value'];
  dataSource: any[];;

}
