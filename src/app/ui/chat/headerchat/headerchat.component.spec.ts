import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderchatComponent } from './headerchat.component';

describe('HeaderchatComponent', () => {
  let component: HeaderchatComponent;
  let fixture: ComponentFixture<HeaderchatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderchatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderchatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
