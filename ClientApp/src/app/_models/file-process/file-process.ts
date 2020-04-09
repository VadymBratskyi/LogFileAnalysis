import { ProcessState } from './process-state';
import { FileInfo } from '@progress/kendo-angular-upload';

export class FileProcess {
    public uploadedFile: FileInfo;
    public processState: ProcessState;
    public errorMessage: string;
    public sessionId: string;

    constructor(options : {
      sessionId: string,  
      uploadedFile: FileInfo  
    }) {
        this.uploadedFile = options.uploadedFile;
        this.processState = ProcessState.default;
        this.sessionId = options.sessionId;
    }
}