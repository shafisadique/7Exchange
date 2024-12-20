import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubAdminService } from '../sub-admin.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AutoGeneratePasswordService } from '../../../shared/services/auto-generate-password.service';
import { ToastrService } from 'ngx-toastr';
import { SubAdminContent } from '../sub-admin.interface';
// import { SubAdminAgentDetails } from '../sub-admin.interface';

@Component({
  selector: 'app-sub-admin-modify',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './sub-admin-modify.component.html',
  styleUrl: './sub-admin-modify.component.scss'
})
export class SubAdminModifyComponent implements OnInit{
   // sharedMaster: Subscriptio;
   subAdminUpdateForm: FormGroup;
   code:string;
   submitted = false;
   isLoading =false;
   subAdmin:any={}
   isBodyLoading=false;
  //  myData:any
  serverErrors:any;

   getId:any;
   options: { label: string; value: string }[] = [];
   constructor(
               private subAdminService:SubAdminService,
               private fb:FormBuilder,
               private router:Router,
               private route:ActivatedRoute,
               private autoGenerate:AutoGeneratePasswordService,
               private toastService:ToastrService
             ) { 
               // this.modifyFormValidator();
               
             }
 
   ngOnInit(): void {
     this.modifyFormValidator();
     this.getId = this.route.snapshot.paramMap.get('id');
     this.subAdminService.getSingleSubAdmin(this.getId).subscribe({
       next:(res:any)=>{
         this.PorulateSumAdminForm(res);
       },
       error: (e:any) => {
         console.error(e.error.msg);
         this.isBodyLoading = false;
     }
    })
   }
 
   modifyFormValidator(){
     this.subAdminUpdateForm = this.fb.group({
       name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
       reference: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
       password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(60)]],
       contactNo: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(11), Validators.pattern(/^[0-9]*$/)]],
       mc: ['', [Validators.required, Validators.min(0), Validators.max(this.subAdmin.mc)]],
       sc: ['', [Validators.required, Validators.min(0), Validators.max(this.subAdmin.sc)]],
       cc: ['', [Validators.required, Validators.min(0), Validators.max(this.subAdmin.cc)]],
       share: ['', [Validators.required, Validators.min(0), Validators.max(this.subAdmin.share)]],
       casinoShare:['',[Validators.required,Validators.min(0),Validators.max(this.subAdmin.casinoShare)]],
       casinoCheck:[this.subAdmin.casinoCheck,[Validators.required]],
       status:[this.subAdmin.status,[Validators.required]],
       limitUpdate:[this.subAdmin.limitUpdate,[Validators.required]],
   });
   }
 
   PorulateSumAdminForm(data:any){
    this.code = data.code
     if(this.subAdminUpdateForm){
       this.subAdminUpdateForm.patchValue({
         code:data.code,
         name:data.name,
         reference:data.reference,
         password:data.password,
         contactNo:data.contactNo,
         casinoShare:data.casinoShare,
         share:data.share,
         cShare:data.cshare,
         icShare:data.icShare,
         mobileShare:data.mobileShare,
         mc:data.mc,
         sc:data.sc,
         cc:data.cc,
         casinoCheck:data.casinoCheck,
         status:data.status,
         icCheck:data.icCheck,
         limitUpdate:data.limitUpdate
       })
     }
   }
   onSubmit() {
    this.submitted = true;
    if (this.subAdminUpdateForm.valid) {
      this.isLoading = true;
      const formData: SubAdminContent = this.subAdminUpdateForm.value;
      this.subAdminService.updateSubAdmin(this.getId, formData).subscribe({
        next: (res: SubAdminContent) => {
          this.isLoading = false;
          this.toastService.success('Sub-admin updated successfully');
          this.router.navigate(['/sub-admin']);
        },
        error: (err: any) => {
          this.isLoading = false;
          this.toastService.error('Failed to update sub-admin');
          try {
            const serverError = JSON.parse(err.message);
            this.serverErrors = serverError;
          } catch (err) {
            console.error('Error parsing server error:', err);
            this.toastService.error('An unexpected error occurred.');
          }
        }
      });
    }
         
   }
   generatePassword(){
    const randomPassword = this.autoGenerate.generateRandomPassword(8);
    this.subAdminUpdateForm?.get('password')?.setValue(randomPassword);
  }

}
