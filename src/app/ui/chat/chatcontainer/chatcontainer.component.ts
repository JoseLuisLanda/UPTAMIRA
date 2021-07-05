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
recomendations :ElementId[];
element="Chatea Conmigo";
item: ElementId = {} as ElementId;
detail:boolean = false;
mainItem: ElementId = {} as ElementId;
searchItem: ElementId ={options:[{name:"Cursos",value:"curso"},{name:"Anuncios",value:"anuncio"},{name:"Avisos",value:"aviso"}]} as ElementId;
  private mine = true;
  constructor(private afsService : AfsService, private fsService: FirestoreService) { }

  ngOnInit(): void {
    let userId:string = localStorage.getItem("userId") !== null ? localStorage.getItem("userId"):"";
    //console.log("GETTING chat: "+`chats/${userId}`);
    if(userId !== ""){
      this.afsService.doc$(`chats/${userId}`).subscribe((data) => {
        if(data !== undefined)
        this.mainItem =   data as ElementId;
        //console.log("GETTING chat: "+JSON.stringify(this.item));
      
      });
      this.fsService.getCollection(`chats/${userId}/mensajes`, 50).subscribe((data) => {
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
  writeMsg(input:boolean){
    console.log("ONWRITEMSG: "+input);
    this.searchItem ={options:[{name:"Cursos",value:"curso"},{name:"Anuncios",value:"anuncio"},{name:"Avisos",value:"aviso"}]} as ElementId;
    this.detail = false;
    (<HTMLInputElement> document.getElementById("showModal")).click(); 
  }
  saveMessage(valueText: ElementId){
    if(valueText !== null){
      let userId:string = localStorage.getItem("userId") !== null ? localStorage.getItem("userId"):"";
      console.log("On savemessage chatcontainer: "+valueText.name);
     
        this.item.id = userId;
        this.item.url = "chats/"+userId;
      this.item.mine = true;
      this.item.title = valueText.name;
      this.item.dateCreated = this.afsService.getTimeStamp();
      console.log("ITEM: "+JSON.stringify(valueText))
      this.afsService.set(this.item.url+"/mensajes/"+this.afsService.createId(),this.item).then(res =>{
  
        this.fsService.getCollection(`${valueText.name}`, 5).subscribe((data) => {
          console.log("DATA: "+JSON.stringify(data));
          if(data !== undefined && data !== []){
            this.item.title = "Encontre la siguiente información";
          this.recomendations =   data as ElementId[];
          }
          else{
            this.item.title = `No encontre resultados sobre tu búsqueda de ${valueText.name}, intenta de nuevo`;
          this.recomendations = [];
          }
          console.log("RECOMMENDATIONS: "+JSON.stringify(this.recomendations));
          this.item.elements = [];
  
          this.recomendations.forEach(element => {
            this.item.elements.push({name:element.name,url:element.url} as ElementId);
          });
  
          this.item.mine = false;
      
      this.item.dateCreated = this.afsService.getTimeStamp();
      
      if(this.recomendations !== [])
        this.afsService.set(this.item.url+"/mensajes/"+this.afsService.createId(),this.item);
        });
        
  
      }).catch(error=>{
        console.log("ERROR DE EDICION: ");
      }).finally(()=>{
       
      });
    }else{

    }
    

  }
  selectedOption(element:ElementId){
    console.log("Elemento en chatcontainer: "+JSON.stringify(element))
    this.afsService.doc$(`${element.url}`).subscribe((data) => {
      if(data !== undefined){
        this.searchItem = data as ElementId;
        this.detail = true;
        (<HTMLInputElement> document.getElementById("showModal")).click(); 
      }
      
      //console.log("GETTING chat: "+JSON.stringify(this.item));
    
    });
  }
}
