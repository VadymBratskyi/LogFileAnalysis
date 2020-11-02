import { LogTreeModel } from '../component';

export class KnownErrorDTO
{
    public countFounded: number;
    public message: string;
    public status: LogTreeModel[];
    public answer: LogTreeModel[];
}