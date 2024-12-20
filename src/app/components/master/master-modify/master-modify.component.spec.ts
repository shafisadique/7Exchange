import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterModifyComponent } from './master-modify.component';

describe('MasterModifyComponent', () => {
  let component: MasterModifyComponent;
  let fixture: ComponentFixture<MasterModifyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MasterModifyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MasterModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
