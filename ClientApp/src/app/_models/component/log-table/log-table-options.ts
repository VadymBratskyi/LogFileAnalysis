import { LogTableState } from './log-table-model';

export class LogTableOptions {
    public displayTableColumns: string[] = [];
    public expandableColumns: string[] = [];
    public pageSizeOptions: number[] = [];
    public logTableState: LogTableState;
}