import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBetsMatchComponent } from './delete-bets-match.component';

describe('DeleteBetsMatchComponent', () => {
  let component: DeleteBetsMatchComponent;
  let fixture: ComponentFixture<DeleteBetsMatchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteBetsMatchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeleteBetsMatchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
