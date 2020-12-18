import { LogObjectType } from './log-object-type';
import { LogPropertyType } from './log-property-type';

export class LogQuery {
	public key: string;
	public objectType: LogObjectType;
   public propertyType: LogPropertyType;
	public childrens: LogQuery[];
}