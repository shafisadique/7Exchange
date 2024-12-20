import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperModifyComponent } from './super-modify.component';

describe('SuperModifyComponent', () => {
  let component: SuperModifyComponent;
  let fixture: ComponentFixture<SuperModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperModifyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuperModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
