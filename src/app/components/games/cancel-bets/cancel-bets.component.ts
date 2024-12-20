import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { GameService } from '../game.service';
import { Match } from './cancel-bets.interface';
import { NgbDropdownModule, NgbPagination } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cancel-bets',
  standalone: true,
  imports: [CommonModule,NgbDropdownModule,NgbPagination,FormsModule],
  templateUrl: './cancel-bets.component.html',
  styleUrls: ['./cancel-bets.component.scss']
})
export class CancelBetsComponent implements OnInit {
  matches: Match[] = [];

  constructor(private cancleService: GameService,
    public router: Router,

  ) {}

  ngOnInit(): void {
    this.cancleService.getCancleGameData().subscribe(data => {
      this.matches = data.data.content; // Access the content array here
      console.log(this.matches);
    });
  }
  sessionBets(id:any){
    this.router.navigate([`/game/delete-bets/session/${id}`])
  }
}
