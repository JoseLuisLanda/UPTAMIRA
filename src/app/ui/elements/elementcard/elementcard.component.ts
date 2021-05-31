import { Output } from '@angular/core';
import { Component, Input, OnInit, EventEmitter } from '@angular/core';
import { ElementId } from 'src/app/core/collections/element';

@Component({
  selector: 'app-elementcard',
  templateUrl: './elementcard.component.html',
  styleUrls: ['./elementcard.component.css']
})
export class ElementcardComponent implements OnInit {
  
  @Input() item: ElementId;
  @Input() selected: boolean = false;
  @Output() elementSelected: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  constructor() { }

  ngOnInit(): void {
  }
  selectedElement(){
     this.elementSelected.emit(this.item);
  }
}
