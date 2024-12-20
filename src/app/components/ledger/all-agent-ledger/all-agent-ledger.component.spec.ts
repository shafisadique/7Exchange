import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllAgentLedgerComponent } from './all-agent-ledger.component';

describe('AllAgentLedgerComponent', () => {
  let component: AllAgentLedgerComponent;
  let fixture: ComponentFixture<AllAgentLedgerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllAgentLedgerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AllAgentLedgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
