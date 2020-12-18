import { LogObjectType } from './log-object-type';
import { LogPropertyType } from './log-property-type';

export class QueryConfig {
	public key: string;
	public name: string;
	public objectType: LogObjectType;
	public propertyType: LogPropertyType;
}