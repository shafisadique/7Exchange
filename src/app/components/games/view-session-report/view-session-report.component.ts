import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-session-report',
  templateUrl: './view-session-report.component.html',
  standalone:true,
  imports:[CommonModule],
  styleUrls: ['./view-session-report.component.scss']
})
export class ViewSessionReportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
