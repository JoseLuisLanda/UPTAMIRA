import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementlistComponent } from './elementlist/elementlist.component';
import { ElementsRoutingModule } from './elements-routing.module';
import { ElementaddComponent } from './elementadd/elementadd.component';
import { ElementmainComponent } from './elementmain/elementmain.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UploadimageComponent } from './uploadimage/uploadimage.component';
import { NgDropFilesDirective } from 'src/app/core/directives/ng-drop-files.directive';
import { ElementcardComponent } from './elementcard/elementcard.component';
import { Sharedmodule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,ElementsRoutingModule,ReactiveFormsModule, FormsModule, Sharedmodule
  ],
  declarations: [ElementlistComponent, ElementmainComponent]
})
export class ElementsModule { }
