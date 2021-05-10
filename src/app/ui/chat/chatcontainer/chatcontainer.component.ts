import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatcontainer',
  templateUrl: './chatcontainer.component.html',
  styleUrls: ['./chatcontainer.component.css']
})
export class ChatcontainerComponent implements OnInit {
users = [{},{},{},{}];
  private mine = true;
  constructor() { }

  ngOnInit(): void {
  }

}
