import { LogTableSort } from './log-table-sort';

export interface LogTableState {
	skip: number;
	take: number;
	sort: LogTableSort;
}