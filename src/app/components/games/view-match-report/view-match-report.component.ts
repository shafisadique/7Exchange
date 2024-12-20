import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { BET_DETAILS, TEAM_SCORES } from '../../../../core/display-match-dummy-data';
import { BetDetail, TeamScore } from './view-interface';

@Component({
  selector: 'app-view-match-report',
  templateUrl: './view-match-report.component.html',
  standalone:true,
  imports:[CommonModule],
  styleUrls: ['./view-match-report.component.scss']
})
export class ViewMatchReportComponent implements OnInit {
  teamScores: TeamScore[] = TEAM_SCORES;
  betDetails: BetDetail[] = BET_DETAILS;
  constructor() { }

  ngOnInit(): void {
  }

}
