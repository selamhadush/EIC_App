import {AfterViewChecked, Pipe, PipeTransform} from '@angular/core';
import {DocumentModel} from '../model/Document.model';
import {ServiceDocumentsService} from '../Services/service-documents.service';

@Pipe({
  name: 'documentPipe'
})
export class DocumentPipePipe implements PipeTransform, AfterViewChecked {
  documentList: DocumentModel[] = [];

  constructor(private documentServices: ServiceDocumentsService) {
    this.getDocument(localStorage.getItem('ServiceApplicationId'));
  }

  transform(code: any, workFlowId: any, args?: any): any {
    for (const document of this.documentList) {
      if (document.ServicePrerequisiteId === code) {
        return document.KeyWords;
      }
    }
    return null;
  }

  getDocument(workFlowId: any) {
    this.documentServices.getAllById(workFlowId).subscribe(result => {
      this.documentList = result;
      console.log(result);
    });
  }

  ngAfterViewChecked(): void {
    this.getDocument(localStorage.getItem('ServiceApplicationId'));
  }
}