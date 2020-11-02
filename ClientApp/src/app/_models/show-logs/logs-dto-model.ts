import { BaseData } from '../base-models/base-data';
import { LogTreeModel } from '../component';

export class LogsDtoModel extends BaseData {
   	public requestDate: Date;
	public request: LogTreeModel[];
	public responseDate: Date;
	public response: LogTreeModel[];
}