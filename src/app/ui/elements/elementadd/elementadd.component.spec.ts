import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementaddComponent } from './elementadd.component';

describe('ElementaddComponent', () => {
  let component: ElementaddComponent;
  let fixture: ComponentFixture<ElementaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
