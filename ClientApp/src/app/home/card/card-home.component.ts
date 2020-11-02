import { Component, Input } from '@angular/core';
import { CardHome } from '@log_models';
import { ProcessLogFilesService } from '@log_services';

@Component({
  selector: 'app-card-home',
  templateUrl: './card-home.component.html',
  styleUrls: ['./card-home.component.scss']
})
export class CardHomeComponent {

  @Input() cardHome: CardHome;

  constructor(
    public servProcesLogFile: ProcessLogFilesService
  ) { }

}
