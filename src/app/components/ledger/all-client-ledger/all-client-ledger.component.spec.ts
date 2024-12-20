import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllClientLedgerComponent } from './all-client-ledger.component';

describe('AllClientLedgerComponent', () => {
  let component: AllClientLedgerComponent;
  let fixture: ComponentFixture<AllClientLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllClientLedgerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllClientLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
