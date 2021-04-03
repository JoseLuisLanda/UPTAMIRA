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
  constructor(private fsService: FirestoreService,) { 
    this.getElements();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.getElements();
  }

  ngOnInit() {
  }
  getElements(){
    this.fsService.getCollection(this.element, 10).subscribe((data) => {
      this.items = data as ElementId[];
      //console.log("elementos: "+JSON.stringify(this.items))
      //this.countMyEvents();
    });
  }
}
