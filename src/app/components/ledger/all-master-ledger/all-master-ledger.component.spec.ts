import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllMasterLedgerComponent } from './all-master-ledger.component';

describe('AllMasterLedgerComponent', () => {
  let component: AllMasterLedgerComponent;
  let fixture: ComponentFixture<AllMasterLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllMasterLedgerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllMasterLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
