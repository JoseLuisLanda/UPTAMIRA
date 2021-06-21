import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsearchComponent } from './elementsearch.component';

describe('ElementsearchComponent', () => {
  let component: ElementsearchComponent;
  let fixture: ComponentFixture<ElementsearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementsearchComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementsearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
