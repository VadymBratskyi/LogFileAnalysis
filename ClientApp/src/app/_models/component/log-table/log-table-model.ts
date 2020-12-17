import { LogTableSort } from './log-table-sort';

export interface LogTableState {
	count: number;
	skip: number;
	take: number;
	sort: LogTableSort;
}