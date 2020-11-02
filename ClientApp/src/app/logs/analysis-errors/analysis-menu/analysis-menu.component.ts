import { Component, Input } from '@angular/core';
import { ErrorLogObjectsService } from '@log_services';

@Component({
  selector: 'app-analysis-menu',
  templateUrl: './analysis-menu.component.html',
  styleUrls: ['./analysis-menu.component.scss']
})
export class AnalysisMenuComponent {
 
  public links = [
    {
      link: 'unknown-error',
      title: 'Невідомі помилки'
    },
    {
      link: 'known-error',
      title: 'Відомі помилки'
    }
  ];

  constructor(public errorLogObjectsService: ErrorLogObjectsService) {}

}
