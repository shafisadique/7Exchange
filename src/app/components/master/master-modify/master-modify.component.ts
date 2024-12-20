import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { AutoGeneratePasswordService } from '../../../shared/services/auto-generate-password.service';
import { MasterService } from '../master.service';
// import { MasterDataDetails } from '../master.interface';
import { ServerErrors } from '../../subAdmin/server-error';
import { MasterContent, SubAdminMaster } from '../master.interface';
import { SubAdminContent } from '../../subAdmin/sub-admin.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-master-modify',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './master-modify.component.html',
  styleUrl: './master-modify.component.scss'
})
export class MasterModifyComponent {
  masterUpdateForm: FormGroup;
  masterData:SubAdminMaster;
  subAdminData:any;
  submitted:boolean = false;
  isLoading:boolean =false;
  serverErrors:any;
  code:any;
  getId:any;
  options: { label: string; value: string }[] = [];
   constructor(
               private masterService:MasterService,
               private fb:FormBuilder,
               private router:Router,
               private route:ActivatedRoute,
               private autoGenerate:AutoGeneratePasswordService,
               private toastService:ToastrService
             ) { 
               this.modifyFormValidator();
               
             }
 
   ngOnInit(): void {

    this.getId = this.route.snapshot.paramMap.get('id');
  this.modifyFormValidator(); // Initialize the form early

  if (this.getId) {
    this.masterService.getSingleMaster(this.getId).subscribe({
      next: (res: any) => {
        console.log(res)
        this.subAdminData = res.sub;
        this.populatedSubForm(res.sub);
        if (this.subAdminData) {
          this.code = res.data.code;
          this.populateMasterForm(res.data);
          this.updateValidators(); // Update validators after subAdminData is available
        }
      },error: (err:any) => {
        console.log("Error updating data:", err);
        this.toastService.error('Error','An unexpected error occurred.',{progressBar:true})
      }
    });
    }
   }
 
   modifyFormValidator() {
    this.masterUpdateForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      reference: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(60)]],
      contactNo: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(11), Validators.pattern(/^[0-9]*$/)]],
      status:[true],
      share: ['', [Validators.required, Validators.min(0)]], // remove max constraint for now
      casinoShare: ['', [Validators.required, Validators.min(0)]], // remove max constraint for now
      mc: ['', [Validators.required, Validators.min(0)]], // remove max constraint for now
      sc: ['', [Validators.required, Validators.min(0)]], // remove max constraint for now
      cc: ['', [Validators.required, Validators.min(0)]], // remove max constraint for now
      shareSub: [''], // set to null initially
      casinoShareSub: [''], // set to null initially
      mcSub: [''], // set to null initially
      scSub: [''], // set to null initially
      ccSub: [''], // set to null initially
      mobileShare: [0],
      casinoCheck: [true]
    });
  }
  updateValidators() {
    if (this.subAdminData) {
      this.masterUpdateForm.get('share')?.setValidators([Validators.required, Validators.min(0), Validators.max(this.subAdminData.share)]);
      this.masterUpdateForm.get('casinoShare')?.setValidators([Validators.required, Validators.min(0), Validators.max(this.subAdminData.casinoShare)]);
      this.masterUpdateForm.get('mc')?.setValidators([Validators.required, Validators.min(0), Validators.max(this.subAdminData.mc)]);
      this.masterUpdateForm.get('sc')?.setValidators([Validators.required, Validators.min(0), Validators.max(this.subAdminData.sc)]);
      this.masterUpdateForm.get('cc')?.setValidators([Validators.required, Validators.min(0), Validators.max(this.subAdminData.cc)]);
      this.masterUpdateForm.get('shareSub')?.setValidators([Validators.required, Validators.min(0), Validators.max(this.subAdminData.shareSub)]);

      this.masterUpdateForm.updateValueAndValidity(); // Recalculate the validity of the form
    }
  }
 
  populateMasterForm(data: any) {
    this.masterUpdateForm.patchValue({
      name: data.name,
      reference: data.reference,
      password: data.password,
      contactNo: data.contactNo,
      share: data.share,
      casinoShare: data.casinoShare,
      mc: data.mc,
      sc: data.sc,
      cc: data.cc,
      casinoCheck: data.casinoCheck,
    });
  }
  
  populatedSubForm(data:any){
    console.log(data)
    this.masterUpdateForm.patchValue({
      shareSub:data.share,
      casinoShareSub:data.casinoShare,
      mcSub:data.mc,
      scSub:data.sc,
      ccSub:data.cc
    })
  }

   onSubmit() {
    console.log(this.masterUpdateForm.value)
    if (this.masterUpdateForm.valid) {
     const formData: MasterContent = this.masterUpdateForm.value;
     this.masterService.updateMaster(this.getId, formData).subscribe({
         next: (res:any) => {
             this.router.navigate(['/master/master-details']);
            this.toastService.success('Sub-admin updated successfully');

         },
         error: (err:any) => {
             console.log("Error updating data:", err);
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
    this.masterUpdateForm?.get('password')?.setValue(randomPassword);
  }
}
