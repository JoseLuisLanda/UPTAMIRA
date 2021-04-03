import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ElementaddComponent } from './elementadd/elementadd.component';
import { ElementlistComponent } from './elementlist/elementlist.component';
import { ElementmainComponent } from './elementmain/elementmain.component';


const routes: Routes = [
  {
    path: '',
    component: ElementmainComponent
  },
  {
    path: 'elementadd',
    component: ElementaddComponent
  },
  {
    path: 'elementlist',
    component: ElementlistComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ElementsRoutingModule { }