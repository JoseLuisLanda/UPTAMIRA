import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
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
  constructor(private fsService: FirestoreService,) { 
    this.getElements();
  }
  ngOnChanges(changes: SimpleChanges): void {
    
    //this.getElements();
    //console.log("CAmbiando; ",this.searchValue);
    if(this.searchValue !== "" && this.items.length > 0 && this.searchAgainValue === "")
    {
      //this.items = this.items.filter(x => x.normalizedName === this.searchValue);
      this.tempItems = this.items.filter(x => x.normalizedName.includes(this.searchValue));
     console.log("filtrando; ",JSON.stringify(this.tempItems));
      //this.items = this.tempItems;
      this.searchAgainValue = "";
    }else if(this.searchAgainValue !== ""){
      console.log("BUSCAR DE NUEVO POR; "+this.searchAgainValue);
      this.getElements("normalizedName",this.searchAgainValue);
      

    }else{
      console.log("Reset; "+this.searchAgainValue);
      this.tempItems = [] as ElementId[];
      this.searchAgainValue = "";
      this.searchValue = "";
    }
  }

  ngOnInit() {
  }
  getElements(keySearch: string = "",keyValue:string = ""){
   
    this.fsService.getCollection(this.element, 10, keySearch, keyValue).subscribe((data) => {
      keySearch === "" ? this.items = data as ElementId[]:this.tempItems = data as ElementId[];
      this.searchAgainValue = "";
      //console.log("elementos: "+JSON.stringify(this.items))
      //this.countMyEvents();
    });
  }
}
