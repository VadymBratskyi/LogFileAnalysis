import { JObjectType } from './jobject-type';
import { LogQueryType } from './log-query-type';

export class QueryConfig {
	public key: string;
	public name: string;
	public objectType: JObjectType;
	public type: LogQueryType;
}