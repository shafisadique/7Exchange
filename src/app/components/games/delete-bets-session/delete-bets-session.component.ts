import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CancelBet } from './delete-session.interface';
import { GameService } from '../game.service';

@Component({
  selector: 'app-delete-bets-session',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-bets-session.component.html',
  styleUrl: './delete-bets-session.component.scss'
})
export class DeleteBetsSessionComponent {
  bets: CancelBet[] = [];

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.getCancelSessionBetsData().subscribe(response => {
      this.bets = response.data.content; // Access the content array
    });
  }
}
