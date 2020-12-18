import { LogObjectType } from '../query-builder/log-object-type';
import { LogPropertyType } from '../query-builder/log-property-type';

export class QuerySettingsItem {
	name: string;
	queryPath: string;
	objectType: LogObjectType;
	propertyType: LogPropertyType;
	isExistQuery: boolean;
}