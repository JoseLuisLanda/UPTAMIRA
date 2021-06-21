import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ElementId } from 'src/app/core/collections/element';

@Component({
  selector: 'app-cardlist',
  templateUrl: './cardlist.component.html',
  styleUrls: ['./cardlist.component.css']
})
export class CardlistComponent implements OnInit {
  @Input() mine: boolean = true;
  @Input() chats: ElementId[] = [];
  @Output() selectedOption: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  users = [true,false,true,false];
  constructor() { }

  ngOnInit(): void {
  }
  selectedElement(element:ElementId){
    
    this.selectedOption.emit(element);
  }
}
