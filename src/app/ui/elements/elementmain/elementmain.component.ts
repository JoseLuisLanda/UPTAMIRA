import { Component, OnInit } from '@angular/core';
import { ElementId } from 'src/app/core/collections/element';

@Component({
  selector: 'app-elementmain',
  templateUrl: './elementmain.component.html',
  styleUrls: ['./elementmain.component.css']
})
export class ElementmainComponent implements OnInit {
  currentItem:ElementId = {} as ElementId;
  element:string = "grupo";
  userTemplate: ElementId = {displayName:"",email:""} as ElementId;
  groupTemplate: ElementId = {name:"",owner:"", description:""} as ElementId;
  eventTemplate: ElementId = {name:"", description:""} as ElementId;
  constructor() { }

  ngOnInit() {
  }
  newItem(){
    switch(this.element){
      case "grupo":
        this.currentItem = this.groupTemplate;
        break;
      case "usuario":
        this.currentItem = this.userTemplate;
        break;
      case "evento":
        this.currentItem = this.eventTemplate;
        break;
    }
    (<HTMLInputElement> document.getElementById("showModal")).click();
    //console.log("nuevo elemento: "+this.element);
  }
setElement(elem:string){
    console.log("setting elemento: "+elem);
  this.element = elem;

}
}
