import { JObjectType } from './jobject-type';
import { LogQueryType } from './log-query-type';

export interface LogQueryRules {
	field: string;
	operator: string;
	value: string | number;
	objectType: JObjectType;
	type: LogQueryType;
}