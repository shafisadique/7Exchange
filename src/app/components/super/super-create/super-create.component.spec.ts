import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperCreateComponent } from './super-create.component';

describe('SuperCreateComponent', () => {
  let component: SuperCreateComponent;
  let fixture: ComponentFixture<SuperCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SuperCreateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuperCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
