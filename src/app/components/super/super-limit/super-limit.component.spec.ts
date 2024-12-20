import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperLimitComponent } from './super-limit.component';

describe('SuperLimitComponent', () => {
  let component: SuperLimitComponent;
  let fixture: ComponentFixture<SuperLimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperLimitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuperLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
