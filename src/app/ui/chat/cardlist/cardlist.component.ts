import { Component, Input, OnInit } from '@angular/core';
import { ElementId } from 'src/app/core/collections/element';

@Component({
  selector: 'app-cardlist',
  templateUrl: './cardlist.component.html',
  styleUrls: ['./cardlist.component.css']
})
export class CardlistComponent implements OnInit {
  @Input() mine: boolean = true;
  @Input() chats: ElementId[] = [];
  users = [true,false,true,false];
  constructor() { }

  ngOnInit(): void {
  }

}
