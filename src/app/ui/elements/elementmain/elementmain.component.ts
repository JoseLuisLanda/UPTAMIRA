import { Component, OnChanges, OnInit, SimpleChanges,EventEmitter } from '@angular/core';
import { ElementId } from 'src/app/core/collections/element';
import { FirestoreService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'app-elementmain',
  templateUrl: './elementmain.component.html',
  styleUrls: ['./elementmain.component.css']
})
export class ElementmainComponent implements OnInit, OnChanges {
  currentItem:ElementId = {name:"", description:""} as ElementId;
  element:string = "grupo";
  userTemplate: ElementId = {displayName:"",email:""} as ElementId;
  defaultTemplate: ElementId = {name:"", description:""} as ElementId;
  eventTemplate: ElementId = {name:"", description:""} as ElementId;
  groupElement: ElementId = {navBarItems:[{name:"Grupos",normalizedName:"grupo"},
  {name:"Usuarios",normalizedName:"usuario"},{name:"Otros",normalizedName:"otros"}]} as ElementId;
  searchValue:string = "";
  searchAgainValue:string = "";

  constructor(private firebaseSvc: FirestoreService) { }
  ngOnChanges(changes: SimpleChanges): void {
    if(localStorage.getItem("selectedGroup") !== null)
    this.groupElement = JSON.parse(localStorage.getItem("selectedGroup"));

    //console.log("groupElement: ",this.groupElement);
  }

  ngOnInit() {
    if(localStorage.getItem("selectedGroup") !== null)
       this.groupElement = JSON.parse(localStorage.getItem("selectedGroup"));
  }
 
  newItem(){
    this.firebaseSvc.getCollection(this.element,10,"name","default").subscribe((data) => {
      //console.log("GETTING DATA"+ JSON.stringify(data));
     if(data[0])
     this.currentItem  = data[0].template as ElementId;
     else
     this.currentItem = this.defaultTemplate;
     (<HTMLInputElement> document.getElementById("showModal")).click();
   });
   
  }
  selectedElement(elem:ElementId){
    //console.log("setting elemento: "+JSON.stringify(elem));
    if(elem.name == "default")
    this.newItem();
    else
  this.element = elem.normalizedName;

}
searchElement(val:string){
  //console.log("setting value to search: "+val);
  this.searchValue = val;

}
searchAgain(val:string){
  //console.log("SEARCH AGAIN: "+val);
  this.searchAgainValue = val;

}
setSelectedGroup(selectedGroup:string){
  //console.log("groupSelected: "+selectedGroup);
  this.groupElement = JSON.parse(selectedGroup);
}
}
