import { Component, Input, OnInit } from '@angular/core';
import { ElementId } from 'src/app/core/collections/element';

@Component({
  selector: 'app-elementcard',
  templateUrl: './elementcard.component.html',
  styleUrls: ['./elementcard.component.css']
})
export class ElementcardComponent implements OnInit {
  
  @Input() item: ElementId;
  constructor() { }

  ngOnInit(): void {
  }

}
