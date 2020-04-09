import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-filters-panel',
  templateUrl: './filters-panel.component.html',
  styleUrls: ['./filters-panel.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FiltersPanelComponent implements OnInit {

  public isQueryBuilderCardExpanded: boolean;

  constructor() { }

  ngOnInit() {
  }

}
