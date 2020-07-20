import { BaseData } from '../base-models/base-data';

export class LogsDtoModel extends BaseData {
   	public requestDate: Date;
	public request: string;
	public responseDate: Date;
	public response: string;
}