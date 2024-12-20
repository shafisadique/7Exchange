import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataService } from '../../services/data-loading.service';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  public show: boolean = true;

  constructor(private loadingService: DataService) {
    setTimeout(() => {
      this.show = false;
    }, 1500);
  }

  ngOnInit() { 
    this.loadingService.loading$.subscribe(show => {
      this.show = show;
    });
  }

  ngOnDestroy() { }

}
