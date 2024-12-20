import { Component, OnInit } from '@angular/core';
import { BetDetails, SessionDetail, TeamBettingDetail } from './match-position.interface';
import { betDetails, sessionDetails, teamBettingDetails } from '../../../../core/session-commition-dummy-data';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-match-position',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './match-position.component.html',
  styleUrl: './match-position.component.scss'
})
export class MatchPositionComponent implements OnInit{
  teamDetails: TeamBettingDetail[] = [];
  sessionDetails: SessionDetail[] = [];
  betDetails: BetDetails[] = [];
  ngOnInit(): void {
    this.teamDetails = teamBettingDetails;
    this.sessionDetails =sessionDetails;
    this.betDetails = betDetails;
  }
}
