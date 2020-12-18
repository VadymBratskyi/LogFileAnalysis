import { LogObjectType } from './log-object-type';
import { LogPropertyType } from './log-property-type';

export interface LogQueryRules {
	field: string;
	operator: string;
	value: string | number;
	objectType: LogObjectType;
	propertyType: LogPropertyType;
}