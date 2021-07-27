import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ElementId } from 'src/app/core/collections/element';

@Component({
  selector: 'app-elementsearch',
  templateUrl: './elementsearch.component.html',
  styleUrls: ['./elementsearch.component.css']
})
export class ElementsearchComponent implements OnInit {
  @Input() item: ElementId = {navBarItems:[{name:"Historial"},{name:"Archivados"}],name:"default"} as ElementId;
  @Output() searchParams: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  itemToSearch: ElementId={} as ElementId;
  constructor() { }

  ngOnInit(): void {
  }
  saveMessage(valueText: string){
    if(valueText !== "")
    {
      this.itemToSearch.name = valueText;
      console.log("Mensaje a guardar: "+valueText);
      this.searchParams.emit(this.itemToSearch);
      (<HTMLInputElement> document.getElementById("valueText")).value = ""; 
      (<HTMLInputElement> document.getElementById("dismissModal")).click(); 
    }
    

  }
}
