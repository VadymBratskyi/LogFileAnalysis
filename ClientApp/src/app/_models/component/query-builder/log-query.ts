import { JObjectType } from './jobject-type';
import { LogQueryType } from './log-query-type';

export class LogQuery {
    public objectType: JObjectType;
	public key: string;
    public logQueryType: LogQueryType;
	public childrens: LogQuery[];
}