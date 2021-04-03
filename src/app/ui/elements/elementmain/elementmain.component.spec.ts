import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementmainComponent } from './elementmain.component';

describe('ElementmainComponent', () => {
  let component: ElementmainComponent;
  let fixture: ComponentFixture<ElementmainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElementmainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElementmainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
