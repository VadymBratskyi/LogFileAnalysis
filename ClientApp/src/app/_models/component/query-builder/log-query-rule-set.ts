import { LogQueryRules } from './log-query-rules';

export interface LogQueryRuleSet {
	condition: string;
	rules: LogQueryRules[];
}