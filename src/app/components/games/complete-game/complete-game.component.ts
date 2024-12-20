import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompleteGame } from '../game-interface';
import { GameService } from '../game.service';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-complete-game',
  standalone:true,
  imports:[CommonModule,NgbDropdownModule],
  templateUrl: './complete-game.component.html',
  styleUrls: ['./complete-game.component.scss']
})
export class CompleteGameComponent implements OnInit {
  completeGames: CompleteGame[] = [];
  constructor(private router:Router,private completeGameService: GameService) { }
  
  ngOnInit(): void {
    this.loadCompleteData()
  }

  loadCompleteData(){
    this.completeGameService.getCompleteGames().subscribe({
      next:(res:any)=>{
        this.completeGames = res;
      }
    })
  }

  matchPosition(id:string){
    this.router.navigate([`/game/matchPosition/${id}`])
  }
  sessionPlusMinus(id:string){
    this.router.navigate([`/game/sessionPlusMinus/${id}`])
  }
  displayMatchSession(id:string){
    this.router.navigate([`/game/display-match-session/${id}`])
  }
  displayMatchBets(id:string){
    this.router.navigate([`/game//view-match-reports/${id}`])
  }
  viewSessionReports(id:string){
    this.router.navigate([`/game/view-session-reports/${id}`])
  }
}
