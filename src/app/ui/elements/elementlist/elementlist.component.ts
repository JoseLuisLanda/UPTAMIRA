import { Component, Input, OnChanges, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { ElementId } from 'src/app/core/collections/element';
import { FirestoreService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'app-elementlist',
  templateUrl: './elementlist.component.html',
  styleUrls: ['./elementlist.component.css']
})
export class ElementlistComponent implements OnInit, OnChanges {
  @Input() item: ElementId = {} as ElementId;
  @Input() element: string = "grupo";
  items:ElementId[];
  tempItems:ElementId[] = [] as ElementId[];
  @Input() searchValue:string = "";
  @Input() searchAgainValue:string = "";
  @Output() selectedGroup: EventEmitter<string> = new EventEmitter<string>();
  currentGroup:ElementId;
  
  constructor(private fsService: FirestoreService,) { 
    //this.currentGroup=null;
    //this.getElements();
    //if(this.currentGroup === null ||this.currentGroup === undefined)
      //this.getElements();

  }
  ngOnChanges(changes: SimpleChanges): void {
    
    //this.getElements();
    //console.log("CAmbiando; ",this.searchValue);
    if(this.searchValue !== "" && this.items.length > 0 && this.searchAgainValue === "")
    {
      //this.items = this.items.filter(x => x.normalizedName === this.searchValue);
      this.tempItems = this.items.filter(x => x.normalizedName.includes(this.searchValue));
     //console.log("filtrando; ",JSON.stringify(this.tempItems));
      //this.items = this.tempItems;
      this.searchAgainValue = "";
    }else if(this.searchAgainValue !== ""){
      //console.log("BUSCAR DE NUEVO POR; "+this.searchAgainValue);
      if(this.currentGroup !== null && this.currentGroup !== undefined)
      this.getElements("normalizedName",this.searchAgainValue);
      

    }else{
      //if(this.currentGroup !== null &&this.currentGroup !== undefined)
      this.getElements();
      console.log("Reset; "+this.searchAgainValue);
      this.tempItems = [] as ElementId[];
      this.searchAgainValue = "";
      this.searchValue = "";
      
    }
    
  }

  ngOnInit() {
    this.getElements();
    //this.currentGroup = JSON.parse(localStorage.getItem("selectedGroup"));
  }
  getElements(keySearch: string = "",keyValue:string = ""){
   
    this.fsService.getCollection(this.element, 10, keySearch, keyValue).subscribe((data) => {
      keySearch === "" ? this.items = data as ElementId[]:this.tempItems = data as ElementId[];
      this.searchAgainValue = "";
      console.log("GETTING elementList: ");
      if(this.element === "grupo" && this.items.length > 0 && (this.currentGroup === null ||this.currentGroup === undefined))
      {
        console.log("IS GROUPLIST: "+ JSON.stringify(this.items[0].name));
       
         this.setCurrentGroup(this.items[0]);
      }
      //this.currentGroup = JSON.parse(localStorage.getItem("selectedGroup"));
      //console.log("elementos: "+JSON.stringify(this.items))
      //this.countMyEvents();
    });
  }
  setCurrentGroup(group:ElementId){
    console.log("SETTING GROUP: "+ JSON.stringify(group));
        localStorage.setItem("selectedGroup",JSON.stringify(group));
        this.currentGroup = group;
        this.selectedGroup.emit(JSON.stringify(group));
        
        
  }
}
