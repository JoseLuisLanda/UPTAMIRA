import { Component, OnInit } from '@angular/core';
import { ElementId } from 'src/app/core/collections/element';
import { AfsService } from 'src/app/core/services/afs.service';
import { FirestoreService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'app-chatcontainer',
  templateUrl: './chatcontainer.component.html',
  styleUrls: ['./chatcontainer.component.css']
})
export class ChatcontainerComponent implements OnInit {
users = [{},{},{},{}];
element="Chatea Conmigo";
item: ElementId = {} as ElementId;
mainItem: ElementId = {} as ElementId;
searchItem: ElementId ={options:[{name:"Eventos",value:"evento"},{name:"Anuncios",value:"anuncio"}]} as ElementId;
  private mine = true;
  constructor(private afsService : AfsService, private fsService: FirestoreService) { }

  ngOnInit(): void {
    let userId:string = localStorage.getItem("userId") !== null ? localStorage.getItem("userId"):"";
    console.log("GETTING chat: "+`chats/${userId}`);
    if(userId !== ""){
      this.afsService.doc$(`chats/${userId}`).subscribe((data) => {
        if(data !== undefined)
        this.mainItem =   data as ElementId;
        console.log("GETTING chat: "+JSON.stringify(this.item));
      
      });
      this.fsService.getCollection(`chats/${userId}/mensajes`, 7).subscribe((data) => {
        if(data !== undefined)
        this.users =   data as ElementId[];
        //console.log("GETTING chat messages: "+JSON.stringify(this.users));
      });
    }else{
      //TODO: userid is not available
    }
    
 
    //console.log("GETTING: "+this.element, 10, "id", userId);
    //this.afsService.doc$()
  }
  saveMessage(valueText: string){
    let userId:string = localStorage.getItem("userId") !== null ? localStorage.getItem("userId"):"";
    console.log("On savemessage chatcontainer: "+valueText);
   
      this.item.id = userId;
      this.item.url = "chats/"+userId;
    this.item.mine = true;
    this.item.title = valueText;
    this.item.dateCreated = this.afsService.getTimeStamp();
    this.afsService.set(this.item.url+"/mensajes/"+this.afsService.createId(),this.item).then(res =>{
      this.item.mine = false;
    this.item.title = "procesando tu solicitud...";
    this.item.dateCreated = this.afsService.getTimeStamp();
      this.afsService.set(this.item.url+"/mensajes/"+this.afsService.createId(),this.item);

    }).catch(error=>{
      console.log("ERROR DE EDICION: ");
    }).finally(()=>{
     
    });

  }
}
