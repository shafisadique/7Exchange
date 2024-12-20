import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientPlusMinusComponent } from './client-plus-minus.component';

describe('ClientPlusMinusComponent', () => {
  let component: ClientPlusMinusComponent;
  let fixture: ComponentFixture<ClientPlusMinusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientPlusMinusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientPlusMinusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
