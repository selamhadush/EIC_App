import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '@custor/modules/shared.module';
import {LettertempalteRoutingModule} from './lettertempalte-routing.module';
import {LettertemplateComponent} from './lettertemplate.component';
import {EditorModule} from '@tinymce/tinymce-angular';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LettertempalteRoutingModule,
    EditorModule
  ],
  declarations: [LettertemplateComponent],
  exports: [LettertemplateComponent]
})
export class LettertemplateModule { }
