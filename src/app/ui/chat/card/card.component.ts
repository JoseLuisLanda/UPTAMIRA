import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ElementId } from 'src/app/core/collections/element';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() chat: ElementId = {} as ElementId;
  @Output() selectedOption: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  mine = false;
  constructor() { }

  ngOnInit(): void {
  }
  selectedItem(element: ElementId){
   this.selectedOption.emit(element);

  }
}
