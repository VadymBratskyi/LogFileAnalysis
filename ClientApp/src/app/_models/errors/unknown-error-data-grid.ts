import { ResponseGridData } from '../response-grid-data';
import { UnKnownError } from './unknown-error';

export class UnknownErrorDataGrid implements ResponseGridData<UnKnownError> {
    data: UnKnownError[];
    countLogs: number;
}