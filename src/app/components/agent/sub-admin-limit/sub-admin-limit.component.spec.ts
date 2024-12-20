import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminLimitComponent } from './sub-admin-limit.component';

describe('SubAdminLimitComponent', () => {
  let component: SubAdminLimitComponent;
  let fixture: ComponentFixture<SubAdminLimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubAdminLimitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubAdminLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
