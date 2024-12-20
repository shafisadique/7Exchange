import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-session-plus-minus-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './session-plus-minus-select.component.html',
  styleUrl: './session-plus-minus-select.component.scss'
})
export class SessionPlusMinusSelectComponent implements OnInit{
  currentRole:any;
  constructor(private authService:AuthService){}
  ngOnInit(): void {
    this.currentRole = this.authService.getUserRole();
    console.log(this.currentRole)
  }

}
