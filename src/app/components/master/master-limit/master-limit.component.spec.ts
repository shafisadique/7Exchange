import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterLimitComponent } from './master-limit.component';

describe('MasterLimitComponent', () => {
  let component: MasterLimitComponent;
  let fixture: ComponentFixture<MasterLimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterLimitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MasterLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
