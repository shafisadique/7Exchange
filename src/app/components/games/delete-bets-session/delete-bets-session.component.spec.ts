import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBetsSessionComponent } from './delete-bets-session.component';

describe('DeleteBetsSessionComponent', () => {
  let component: DeleteBetsSessionComponent;
  let fixture: ComponentFixture<DeleteBetsSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteBetsSessionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteBetsSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
