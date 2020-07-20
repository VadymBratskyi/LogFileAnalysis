import { BaseData } from '../base-models/base-data';

export class UnKnownError extends BaseData {
    public objectId: string;
    public count: number;
    public message: string;
}