import { Component } from '@angular/core';

@Component({
  selector: 'app-analysis-menu',
  templateUrl: './analysis-menu.component.html',
  styleUrls: ['./analysis-menu.component.scss']
})
export class AnalysisMenuComponent {

  activeLink: string;

  links = [
    {
      link: 'unknown-error',
      title: 'Невідомі помилки'
    },
    {
      link: 'known-error',
      title: 'Відомі помилки'
    }
  ]

}
