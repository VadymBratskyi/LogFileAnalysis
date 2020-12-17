import { RuleSet } from 'angular2-query-builder';
import { FilterParameters } from 'app/_models/filter-parameters';

export class LogFilterParameters extends FilterParameters {
	public rulesset: RuleSet;

	constructor(skip: number, take: number) {
		super(skip, take);
	}
}