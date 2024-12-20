import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSuperLedgerComponent } from './all-super-ledger.component';

describe('AllSuperLedgerComponent', () => {
  let component: AllSuperLedgerComponent;
  let fixture: ComponentFixture<AllSuperLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllSuperLedgerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllSuperLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
