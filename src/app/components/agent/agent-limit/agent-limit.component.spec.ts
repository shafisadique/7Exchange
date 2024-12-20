import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentLimitComponent } from './agent-limit.component';

describe('AgentLimitComponent', () => {
  let component: AgentLimitComponent;
  let fixture: ComponentFixture<AgentLimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentLimitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgentLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
