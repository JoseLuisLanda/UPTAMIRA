import { ViewChild, Renderer2 } from '@angular/core';
import { AfterViewChecked, Component, ElementRef, OnInit } from '@angular/core';
import { ElementId } from 'src/app/core/collections/element';
import { AfsService } from 'src/app/core/services/afs.service';
import { FirestoreService } from 'src/app/core/services/firebase.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-chatcontainer',
  templateUrl: './chatcontainer.component.html',
  styleUrls: ['./chatcontainer.component.css']
})
export class ChatcontainerComponent implements OnInit, AfterViewChecked {

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

users = [{},{},{},{}];
recomendations:ElementId[];
element="Chatea Conmigo";
item: ElementId = {} as ElementId;
detail:boolean = false;
mainItem: ElementId = {} as ElementId;
searchItem: ElementId ={options:[{name:"Cursos",value:"curso"},{name:"Anuncios",value:"anuncio"},{name:"Avisos",value:"aviso"}]} as ElementId;
  private mine = true;
  constructor(private afsService : AfsService, private fsService: FirestoreService,private renderer: Renderer2) { }
  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }

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
    this.scrollToBottom();
 
    //console.log("GETTING: "+this.element, 10, "id", userId);
    //this.afsService.doc$()
  }
  writeMsg(input:boolean){
    console.log("ONWRITEMSG: "+input);
    this.searchItem ={options:[{name:"Trámites",value:"tramite"},{name:"Convocatorias",value:"convocatoria"},{name:"Avisos",value:"aviso"}]} as ElementId;
    this.detail = false;
    (<HTMLInputElement> document.getElementById("showModal")).click(); 
  }
  saveMessage(valueText: ElementId){
   
      let userId:string = localStorage.getItem("userId") !== null ? localStorage.getItem("userId"):"";
      var input = valueText.name;
      
        //two or more words
        console.log("RESPONSE: "+this.output(valueText.name));
        input = this.output(valueText.name);
    
    var newValues = input.split(' ').filter(function(v){return v!==''});
      console.log("BUSCANDO INFO POR CARPETA: "+input);
      //console.log("RESPONSE: "+this.output(valueText.name));

        this.item.id = userId;
        this.item.url = "chats/"+userId;
      this.item.mine = true;
      this.item.title = valueText.name;
      this.item.dateCreated = this.afsService.getTimeStamp();
      console.log("ITEM: "+JSON.stringify(valueText))
      this.afsService.set(this.item.url+"/mensajes/"+this.afsService.createId(),this.item).then(res =>{
  
        //setting message defaults
        this.item.elements = [];
            this.item.mine = false;
            this.item.dateCreated = this.afsService.getTimeStamp();

        if(newValues.length === 1){//get response for firebase folder

          console.log("BUSCANDO EN FOLDER: "+input);
            
    
          this.fsService.getCollection(`${input}`, 5).subscribe((data) => {
            console.log("DATA: "+JSON.stringify(data));
            if(data === undefined || data === [] || data === null){
              this.item.title = `No encontre resultados sobre tu búsqueda de ${input}, intenta de nuevo`;
            this.recomendations = [];
            }
            else{
              this.item.title = "Encontre la siguiente información";
            this.recomendations =   data as ElementId[];
            }
            this.recomendations.forEach(element => {
              this.item.elements.push({name:element.name,url:element.url} as ElementId);
            });
            
  
        if(this.recomendations !== [])
          this.afsService.set(this.item.url+"/mensajes/"+this.afsService.createId(),this.item);
          });
          this.recomendations = [];
        }else{//get a response from chatbot
          console.log("GUARDANDO resp: "+input);
          this.item.title = input;
          this.afsService.set(this.item.url+"/mensajes/"+this.afsService.createId(),this.item);
        }
       
        
  
      }).catch(error=>{
        console.log("ERROR DE EDICION: ");
      }).finally(()=>{
       
      });
   

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

  output(input) {
    let product;
  
    // Regex remove non word/space chars
    // Trim trailing whitespce
    // Remove digits - not sure if this is best
    // But solves problem of entering something like 'hi1'
  
    let text = input.toLowerCase().replace(/[^\w\s]/gi, "").replace(/[\d]/gi, "").trim();
    text = text
      .replace(/ a /g, " ")   // 'tell me a story' -> 'tell me story'
      .replace(/i feel /g, "")
      .replace(/whats/g, "what is")
      .replace(/please /g, "")
      .replace(/ please/g, "")
      .replace(/r u/g, "are you");
  
    if (this.compare(environment.prompts, environment.replies, text)) { 
      // Search for exact match in `prompts`
      product = this.compare(environment.prompts, environment.replies, text);
    } else if (text.match(/gracias/gi)) {
      product = "De nada!"
    } else if (text.match(/(corona|covid|virus)/gi)) {
      // If no match, check if message contains `coronavirus`
      product = environment.coronavirus[Math.floor(Math.random() * environment.coronavirus.length)];
    } else if (text.match(/(informacion general|ubicacion|telefono|contacto|ayuda)/gi)) {
      // If no match, check if message contains `informacion`
      product = environment.informacion[Math.floor(Math.random() * environment.coronavirus.length)];
    } else if (text.match(/(curso|taller|reunion)/gi)) {
      // If no match, check if message contains `cursos`
      product = environment.curso[Math.floor(Math.random() * environment.coronavirus.length)];
    }else if (text.match(/(tramite|trámite|proceso)/gi)) {
      // If no match, check if message contains `tramites`
      product = environment.tramite[Math.floor(Math.random() * environment.coronavirus.length)];
    } else if (text.match(/(convocatoria|concurso|evento|beca|aviso)/gi)) {
      // If no match, check if message contains `convocatorias`
      product = environment.convocatoria[Math.floor(Math.random() * environment.coronavirus.length)];
    } else {
      // If all else fails: random alternative
      product = environment.alternative[Math.floor(Math.random() * environment.alternative.length)];
    }
  
    return product;
  }
  
  compare(promptsArray, repliesArray, string) {
    let reply;
    let replyFound = false;
    for (let x = 0; x < promptsArray.length; x++) {
      for (let y = 0; y < promptsArray[x].length; y++) {
        if (promptsArray[x][y] === string) {
          let replies = repliesArray[x];
          reply = replies[Math.floor(Math.random() * replies.length)];
          replyFound = true;
          // Stop inner loop when input value matches prompts
          break;
        }
      }
      if (replyFound) {
        // Stop outer loop when reply is found instead of interating through the entire array
        break;
      }
    }
    return reply;
  }
  scrollToBottom(): void {
    try {
      this.renderer.setAttribute(this.myScrollContainer.nativeElement, "disabled", "true");
      
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        //this.myScrollContainer.nativeElement.visibility = "false";
    } catch(err) { }                 
}
}
