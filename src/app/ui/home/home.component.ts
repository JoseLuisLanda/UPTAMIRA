import { Component, OnInit } from '@angular/core';
import { ElementId } from 'src/app/core/collections/element';
import { FirestoreService } from 'src/app/core/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  elements:ElementId[];
  convocatorias:ElementId[];
  constructor(private fsService: FirestoreService) { }

  ngOnInit() {
    this.fsService.getCollection(`aviso/`, 10).subscribe((data) => {
      if(data !== undefined)
      this.elements =   data as ElementId[];
    });
    this.fsService.getCollection(`convocatoria/`, 5).subscribe((data) => {
      if(data !== undefined)
      this.convocatorias =   data as ElementId[];
    });
  }

}
