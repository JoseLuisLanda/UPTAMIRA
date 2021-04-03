import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ElementId } from 'src/app/core/collections/element';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnChanges {
  @Input() item: ElementId = {} as ElementId;
  @Input() element: string;
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    console.log("ITEM CHANGE: "+JSON.stringify(this.item)+this.element)
  }

  ngOnInit() {
  }

}
