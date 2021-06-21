import { Component, Input, OnChanges, OnInit, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { ElementId } from 'src/app/core/collections/element';
import { AfsService } from 'src/app/core/services/afs.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnChanges {
  @Input() item: ElementId = {} as ElementId;
  @Input() element: string;
  @Input() edit: boolean = false;
  @Input() detail: boolean = false;
  @Output() valueInputText: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("ITEM CHANGE: "+JSON.stringify(this.item)+this.element)
  }

  ngOnInit() {
  }
  saveMessage(valueText: ElementId){

    //console.log("Mensaje a guardar: "+JSON.stringify(valueText));
    this.valueInputText.emit(valueText);
    //(<HTMLInputElement> document.getElementById("valueText")).value = ""; 
    (<HTMLInputElement> document.getElementById("dismissModal")).click(); 

  }
}
