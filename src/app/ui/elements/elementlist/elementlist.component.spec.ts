import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementlistComponent } from './elementlist.component';

describe('ElementlistComponent', () => {
  let component: ElementlistComponent;
  let fixture: ComponentFixture<ElementlistComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementlistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
