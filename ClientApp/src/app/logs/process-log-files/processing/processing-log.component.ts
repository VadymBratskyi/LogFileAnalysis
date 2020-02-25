import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-processing-log',
  templateUrl: './processing-log.component.html',
  styleUrls: ['./processing-log.component.scss']
})
export class ProcessingLogComponent implements OnInit {

  @Input() inSms: string[];

  constructor() { }

  ngOnInit() {
  }

}
