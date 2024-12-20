import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() data: any;

  dataName: string;
  dataArray: any[];
  currentRouter:string;
  id: any;

  constructor(public activeModal: NgbActiveModal,private router: Router) {}

  ngOnInit(): void {
    this.dataName = this.data.dataName;
    this.dataArray = this.data.dataArray;
  }

  onContinue(){
    if(this.data.currentRouter == 'Master'){
      this.router.navigate([`/master/master-create/${this.id}`]);
      this.activeModal.close();
    }else if(this.data.currentRouter == 'Super'){
      this.router.navigate([`/super/super-create/${this.id}`]);
      this.activeModal.close();
    }else if(this.data.currentRouter == 'Agent'){
      this.router.navigate([`/agent/agent-create/${this.id}`]);
      this.activeModal.close();
    }else if(this.data.currentRouter == 'Client'){
      this.router.navigate([`client/client-create/${this.id}`])
      this.activeModal.close();
    }
  }

  close() {
    this.activeModal.close();
  }
}
