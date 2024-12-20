import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchSessionPlusMinusDisplayComponent } from './match-session-plus-minus-display.component';

describe('MatchSessionPlusMinusDisplayComponent', () => {
  let component: MatchSessionPlusMinusDisplayComponent;
  let fixture: ComponentFixture<MatchSessionPlusMinusDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchSessionPlusMinusDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchSessionPlusMinusDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
