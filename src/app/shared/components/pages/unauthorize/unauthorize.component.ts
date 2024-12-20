import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-unauthorize',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './unauthorize.component.html',
  styleUrl: './unauthorize.component.scss'
})
export class UnauthorizeComponent {

}
