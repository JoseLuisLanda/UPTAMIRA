import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../ui/modal/modal.component';
import { ElementaddComponent } from '../ui/elements/elementadd/elementadd.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule, ReactiveFormsModule, FormsModule
    ],
    exports:[
        ModalComponent,ReactiveFormsModule, FormsModule,ElementaddComponent,CommonModule
    ],
    declarations: [ModalComponent,ElementaddComponent]
  })
export class Sharedmodule{


}