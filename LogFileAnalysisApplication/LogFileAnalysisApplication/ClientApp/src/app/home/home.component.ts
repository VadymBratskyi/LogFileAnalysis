import { Component, OnInit } from '@angular/core';
import { CardHome } from '@log_models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  homeCards: CardHome[];

  constructor() { }

  ngOnInit() {
    this.homeCards = [
      this.CreateProcessLogFileCard(),
      this.CreateShowLogObjectsCard(),
      this.CreateAnalysisLogObjectsCard()
    ];
  }

  private CreateProcessLogFileCard(): CardHome {
    var card = new CardHome();
    card.title = "Обробка Log-файлів.";
    card.subTitle = "Збереження об'єктів для аналізу.";
    card.contentImage ="assets/images/log_analysis.png";
    card.contentParagraph ="Система приймає log-файли, для подальшого аналізу їх місткості. Знайшовши співпадання за шаблоном"
    +"система створює обьєкти, які зберігаються у базу знаннь. ";
    card.rouuterLink = '/process-log-files';
    return card;
  }

  private CreateShowLogObjectsCard(): CardHome {
    var card = new CardHome();
    card.title = "Перегляд Log-об'єктів.";
    card.subTitle = "Перегляд об'єктів і їх фільтрація.";
    card.contentImage ="assets/images/query_builder.png";
    card.contentParagraph ="Система надає можливість перглянути в зручному вигляді усі проаналізовані об'єкти у log-файлі," 
    +"а також система надасть варінти побудови фільтрів для запиту.";
    card.rouuterLink = '/show-log-objects';
    return card;
  }
  
  private CreateAnalysisLogObjectsCard(): CardHome {
    var card = new CardHome();
    card.title = "Аналіз Log-об'єктів.";
    card.subTitle = "Обробка об'єктів і навчання системи.";
    card.contentImage ="assets/images/study_system.png";
    card.contentParagraph ="Система обирає усі Log-об'єкти з помилковим статусом і дяє Вам можливість їх обробити" 
    +"і навчити систему для подальшого автоматичного реагування. ";
    card.rouuterLink = '/analysis-log-objects';
    return card;    
  }  

}
