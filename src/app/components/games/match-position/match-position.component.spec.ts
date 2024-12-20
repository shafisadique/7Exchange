import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchPositionComponent } from './match-position.component';

describe('MatchPositionComponent', () => {
  let component: MatchPositionComponent;
  let fixture: ComponentFixture<MatchPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatchPositionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatchPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
