import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubAdminCreateComponent } from './sub-admin-create.component';

describe('SubAdminCreateComponent', () => {
  let component: SubAdminCreateComponent;
  let fixture: ComponentFixture<SubAdminCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubAdminCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubAdminCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
