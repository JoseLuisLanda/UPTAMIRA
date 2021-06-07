import { Component, Input, OnInit } from '@angular/core';
import { ElementId } from 'src/app/core/collections/element';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input() chat: ElementId = {} as ElementId;
  mine = false;
  constructor() { }

  ngOnInit(): void {
  }

}
