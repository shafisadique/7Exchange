import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientLimitComponent } from './client-limit.component';

describe('ClientLimitComponent', () => {
  let component: ClientLimitComponent;
  let fixture: ComponentFixture<ClientLimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientLimitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ClientLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
