import { Input, Output,EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ElementId } from 'src/app/core/collections/element';

@Component({
  selector: 'app-headerchat',
  templateUrl: './headerchat.component.html',
  styleUrls: ['./headerchat.component.css']
})
export class HeaderchatComponent implements OnInit {

  @Input() navbar: ElementId = {navBarItems:[{name:"Grupos"},{name:"Usuarios"}],name:"default"} as ElementId;
  @Output() selectedItem: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  constructor() { }

  ngOnInit(): void {
  }

  selectedElement(elem:ElementId){
    //console.log("presionando elemento");
    if(elem === undefined)
    elem = {name:"default"} as ElementId;
  this.selectedItem.emit(elem);
  }
}
