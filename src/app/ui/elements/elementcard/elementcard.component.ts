import { Output, SimpleChanges } from '@angular/core';
import { Component, Input, OnInit, EventEmitter, OnChanges } from '@angular/core';
import { ElementId } from 'src/app/core/collections/element';

@Component({
  selector: 'app-elementcard',
  templateUrl: './elementcard.component.html',
  styleUrls: ['./elementcard.component.css']
})
export class ElementcardComponent implements OnInit, OnChanges {
  
  @Input() item: ElementId;
  @Input() selected: boolean = false;
  @Input() detail: boolean = false;
  @Input() showImg: boolean = false;
  @Input() imgURL: string = "";
  @Output() elementSelected: EventEmitter<ElementId> = new EventEmitter<ElementId>();
  imgs:ElementId[] = [];
  constructor() { }
  ngOnChanges(changes: SimpleChanges): void {
    this.imgs = this.item.images;
  }
 
  ngOnInit(): void {
  }
  selectedElement(){
     this.elementSelected.emit(this.item);
  }
  selectedImage(id: number){
    this.imgURL = this.imgs[id].url;
    this.showImg = true;
    console.log("SELECTING: "+this.imgs[id].url);
  }
  closeImg(){
    this.showImg = false;
  }
}
