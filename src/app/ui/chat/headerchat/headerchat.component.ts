import { Input, Output,EventEmitter } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ElementId } from 'src/app/core/collections/element';

@Component({
  selector: 'app-headerchat',
  templateUrl: './headerchat.component.html',
  styleUrls: ['./headerchat.component.css']
})
export class HeaderchatComponent implements OnInit {

  @Input() navbar: ElementId = {navBarItems:[{name:"Historial"},{name:"Archivados"}],name:"default"} as ElementId;
  @Input() newBtn: boolean = false;
  @Output() selectedItem: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  @Output() searchValue: EventEmitter<string> = new EventEmitter<string>();
  @Output() searchAgain: EventEmitter<string> = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  selectedElement(elem:ElementId){
    //console.log("presionando elemento");
    if(elem === undefined)
    elem = {name:"default"} as ElementId;
  this.selectedItem.emit(elem);
  }
  onSearchChange(searchValue: string): void {  
    this.searchValue.emit(searchValue);
    console.log(searchValue);

  }
  async onSubmit(form: NgForm): Promise<void> {
    if (form.invalid) {
      return;
    }
    console.log("forma: "+JSON.stringify(form.value));
    this.searchAgain.emit(form.controls['keyToSearch'].value);
    
  }
 
}
