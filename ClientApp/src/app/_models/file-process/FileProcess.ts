import { ProcessState } from './ProcessState';
import { FileInfo, FileState } from '@progress/kendo-angular-upload';

export class FileProcess {
    uploadedFile: FileInfo;
    processState: ProcessState;
    errorMessage: string;
    sessionId: string;

    constructor(options : {
      sessionId: string,  
      uploadedFile: FileInfo  
    }) {
        this.uploadedFile = options.uploadedFile;
        this.processState = ProcessState.default;
        this.sessionId = options.sessionId;
    }
}