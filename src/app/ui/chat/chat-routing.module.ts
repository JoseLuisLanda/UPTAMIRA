import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardComponent } from './card/card.component';
import { CardlistComponent } from './cardlist/cardlist.component';
import { ChatcontainerComponent } from './chatcontainer/chatcontainer.component';


const routes: Routes = [
  {
    path: '',
    component: ChatcontainerComponent
  },
  {
    path: 'card',
    component: CardComponent
  },
  {
    path: 'cardlist',
    component: CardlistComponent
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChatRoutingModule { }