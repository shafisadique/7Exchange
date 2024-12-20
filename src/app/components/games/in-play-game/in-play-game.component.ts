import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatchDetails } from '../game-interface';
import { matchDetails } from '../../../../core/inplay-dummy-data';
import { Subject, takeUntil } from 'rxjs';
import { GameService } from '../game.service';
@Component({
  selector: 'app-in-play-game',
  templateUrl: './in-play-game.component.html',
  standalone: true,
  imports: [CommonModule, NgbDropdownModule, NgbModule,RouterModule,FormsModule],
  styleUrls: ['./in-play-game.component.scss']
})
export class InPlayGameComponent implements OnInit {
  gameDetails: MatchDetails[] = matchDetails;
  isEnabled: boolean = true;
  private destroy$ = new Subject<void>(); 
  errorMessage = '';

  constructor(private router:Router,private gameService:GameService) { }

  ngOnInit(): void {
    this.fetchGames();
  }
  fetchGames(): void {
    this.gameService
      .getInPlayGames().pipe(takeUntil(this.destroy$)).subscribe({
        next: (data) => {
          console.log(data)
          // this.gameDetails = data;
        },
        error: (err) => {
          this.errorMessage = err.message;
        },
      });
  }
  matchSessionPosition(id:Number,name:string,gameName:string){
    this.router.navigate([`/game/${gameName}/matchPosition/${id}`], { queryParams: { name: name } });
  }
  
  sessionPlusMinus(id:Number){
    this.router.navigate([`/game/sessionPlusMinus/${id}`])
  }
  displayMatchAndSessionBets(id:Number){
    this.router.navigate([`/game/displayMatchSession/${id}`])
  }
  matchAndSessionPosition(id:Number){
    this.router.navigate([`/game/match-position/${id}`])
  }
  displaySessionBets(id:Number){
    this.router.navigate([`/game/viewSessionReport/${id}`])
  }
  displayMatchSession(id:any){
    this.router.navigate([`/game/display-match-session/${id}`])
  }
  displayMatchBets(id:any){
    this.router.navigate([`/game/view-match-reports/${id}`])
  }
  viewSessionReports(id:any){
    this.router.navigate([`/game/view-session-reports/${id}`])
  }
  sessionPlusMinusSelect(id:any){
    this.router.navigate([`/game/session-plus-minus-select/${id}`])
  }
  ngOnDestroy(): void {
    // Emit a value to signal completion to all subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }
}
