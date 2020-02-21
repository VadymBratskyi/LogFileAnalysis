import { Component, OnInit, Input } from '@angular/core';
import { CardHome } from '@log_models';

@Component({
  selector: 'app-card-home',
  templateUrl: './card-home.component.html',
  styleUrls: ['./card-home.component.scss']
})
export class CardHomeComponent implements OnInit {

  @Input() cardHome: CardHome;

  constructor() { }

  ngOnInit() {
  }

}
