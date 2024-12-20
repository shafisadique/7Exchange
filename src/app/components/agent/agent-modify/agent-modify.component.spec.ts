import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentModifyComponent } from './agent-modify.component';

describe('AgentModifyComponent', () => {
  let component: AgentModifyComponent;
  let fixture: ComponentFixture<AgentModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgentModifyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AgentModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
