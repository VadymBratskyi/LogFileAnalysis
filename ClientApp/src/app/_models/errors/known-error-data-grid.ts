import { ResponseGridData } from '../response-grid-data';
import { KnownErrorDTO } from './known-error';

export class KnownErrorDataGrid implements ResponseGridData<KnownErrorDTO> {
    data: KnownErrorDTO[];
    countLogs: number;
}