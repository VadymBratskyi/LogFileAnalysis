import { Component, Input } from '@angular/core';
import { QueryBuilderConfig, RuleSet } from 'angular2-query-builder';

@Component({
  selector: 'app-log-query-builder',
  templateUrl: './log-query-builder.component.html',
  styleUrls: ['./log-query-builder.component.scss']
})
export class LogQueryBuilderComponent {

	@Input() query: RuleSet;
	@Input() config: QueryBuilderConfig;

	allowRuleset = true; 
	allowCollapse = true;

	// query = {
	//   condition: 'and',
	//   rules: [ ]
	// }

}
