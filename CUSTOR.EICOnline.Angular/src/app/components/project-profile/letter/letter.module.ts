import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShareModule} from '../project-share/Share.module';
import {LetterComponent} from './letter.component';
import {LetterRoutingModule} from './letter-routing.module';
import {SharedModule} from '@custor/modules/shared.module';
import {EditorModule} from '@tinymce/tinymce-angular';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    LetterRoutingModule,
    EditorModule
  ],
  declarations: [LetterComponent],
  exports: [LetterComponent]
})
export class LetterModule {

}
