import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';
import { ChatRoutingModule } from './chat-routing.module';
import { ChatcontainerComponent } from './chatcontainer/chatcontainer.component';
import { CardlistComponent } from './cardlist/cardlist.component';
import { SearchbarComponent } from './searchbar/searchbar.component';
import { HeaderchatComponent } from './headerchat/headerchat.component';
import { Sharedmodule } from 'src/app/shared/shared.module';
import { ElementsearchComponent } from './elementsearch/elementsearch.component';



@NgModule({
  declarations: [CardComponent, ChatcontainerComponent, CardlistComponent, SearchbarComponent],
  imports: [
    ChatRoutingModule,
    Sharedmodule
  ]
})
export class ChatModule { }
