import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelBetsComponent } from './cancel-bets.component';

describe('CancelBetsComponent', () => {
  let component: CancelBetsComponent;
  let fixture: ComponentFixture<CancelBetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CancelBetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CancelBetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
