import { Component, OnInit } from '@angular/core';
import { SubAdminService } from '../subAdmin/sub-admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
url='assets/images/avtar/1.jpg';
casinoShare:number;
matchCommition:number;
sessionCommition:number;
share:number;
profileName:string;
roleName:string="ADMIN";
userName:string='Mark jecno';
createDate:any;
readUrl(data:any){
}
constructor(private subAdmin:SubAdminService){}
ngOnInit(): void {
  this.subAdmin.getAdminData().subscribe({
    next:(res:any)=>{
      console.log(res)
      this.userName =res.username;
      this.roleName = res.name;
      this.createDate = res.createAt;
      this.share = res.share
      this.casinoShare = res.casinoShare;
      this.matchCommition = res.mc;
      this.sessionCommition = res.sc;

    }
  })
  
}
}
