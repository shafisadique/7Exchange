import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionPlusMinusSelectComponent } from './session-plus-minus-select.component';

describe('SessionPlusMinusSelectComponent', () => {
  let component: SessionPlusMinusSelectComponent;
  let fixture: ComponentFixture<SessionPlusMinusSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SessionPlusMinusSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SessionPlusMinusSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
