import { ResponseGridData } from '../response-grid-data';
import { LogsDtoModel } from './logs-dto-model';

export class LogsDataGrid implements ResponseGridData<LogsDtoModel> {
    public data: LogsDtoModel[];
    public countLogs: number;
}