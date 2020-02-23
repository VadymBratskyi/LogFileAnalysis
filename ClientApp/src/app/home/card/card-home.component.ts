import { Component, OnInit, Input } from '@angular/core';
import { CardHome } from '@log_models';
import { ProcessLogFilesService } from '@log_services/process-log-files.service';

@Component({
  selector: 'app-card-home',
  templateUrl: './card-home.component.html',
  styleUrls: ['./card-home.component.scss']
})
export class CardHomeComponent implements OnInit {

  @Input() cardHome: CardHome;

  constructor(
    public servProcesLogFile: ProcessLogFilesService
  ) { }

  ngOnInit() {
  }

  public CreateSession() {
    this.servProcesLogFile.CreateProcessLogSession().subscribe(sessionId => {
      alert(sessionId);
    });
  }

}
