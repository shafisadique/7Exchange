import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-display-match-session',
  standalone:true,
  imports:[CommonModule],
  templateUrl: './display-match-session.component.html',
  styleUrls: ['./display-match-session.component.scss']
})
export class DisplayMatchSessionComponent implements OnInit {
  id:any;
  constructor(private route:ActivatedRoute) { }

  ngOnInit(): void {
  this.id = this.route.snapshot.paramMap.get('id')
  }
}
