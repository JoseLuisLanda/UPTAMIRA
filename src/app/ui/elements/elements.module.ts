import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementlistComponent } from './elementlist/elementlist.component';
import { ElementsRoutingModule } from './elements-routing.module';
import { ElementaddComponent } from './elementadd/elementadd.component';
import { ElementmainComponent } from './elementmain/elementmain.component';
import { ModalComponent } from '../modal/modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,ElementsRoutingModule,ReactiveFormsModule, FormsModule,
  ],
  declarations: [ElementlistComponent, ElementaddComponent, ElementmainComponent,
    ModalComponent]
})
export class ElementsModule { }
