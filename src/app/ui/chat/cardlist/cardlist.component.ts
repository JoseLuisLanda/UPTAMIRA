import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-cardlist',
  templateUrl: './cardlist.component.html',
  styleUrls: ['./cardlist.component.css']
})
export class CardlistComponent implements OnInit {
  @Input() mine: boolean = true;
  users = [true,false,true,false];
  constructor() { }

  ngOnInit(): void {
  }

}
