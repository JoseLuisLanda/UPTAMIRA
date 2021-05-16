import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../ui/modal/modal.component';
import { ElementaddComponent } from '../ui/elements/elementadd/elementadd.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderchatComponent } from '../ui/chat/headerchat/headerchat.component';

@NgModule({
    imports: [
        CommonModule, ReactiveFormsModule, FormsModule
    ],
    exports:[
        ModalComponent,ReactiveFormsModule, FormsModule,ElementaddComponent,CommonModule, HeaderchatComponent
    ],
    declarations: [ModalComponent,ElementaddComponent,HeaderchatComponent]
  })
export class Sharedmodule{


}