import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperDetailsComponent } from './super-details.component';

describe('SuperDetailsComponent', () => {
  let component: SuperDetailsComponent;
  let fixture: ComponentFixture<SuperDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuperDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
