import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../ui/modal/modal.component';
import { ElementaddComponent } from '../ui/elements/elementadd/elementadd.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderchatComponent } from '../ui/chat/headerchat/headerchat.component';
import { ElementsearchComponent } from '../ui/chat/elementsearch/elementsearch.component';
import { UploadimageComponent } from '../ui/elements/uploadimage/uploadimage.component';
import { NgDropFilesDirective } from '../core/directives/ng-drop-files.directive';

@NgModule({
    imports: [
        CommonModule, ReactiveFormsModule, FormsModule
    ],
    exports:[
        UploadimageComponent,ModalComponent,ReactiveFormsModule, FormsModule,ElementaddComponent,CommonModule, HeaderchatComponent,ElementsearchComponent,NgDropFilesDirective
    ],
    declarations: [NgDropFilesDirective,UploadimageComponent,ModalComponent,ElementaddComponent,HeaderchatComponent,ElementsearchComponent]
  })
export class Sharedmodule{


}