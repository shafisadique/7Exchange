import { Component, OnInit } from '@angular/core';
import { SuperService } from '../super.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AutoGeneratePasswordService } from '../../../shared/services/auto-generate-password.service';
import { SuperData } from '../super.interface';
import { ServerErrors } from '../../subAdmin/server-error';
import { CommonModule } from '@angular/common';
import { MasterContent } from '../../master/master.interface';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-super-modify',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './super-modify.component.html',
  styleUrls: ['./super-modify.component.scss']
})
export class SuperModifyComponent implements OnInit {
  superUpdateForm: FormGroup;
  super: any = {};
  submitted = false;
  isLoading = false;
  serverErrors: any = null;
  getId: any;
  masterId:any;
  constructor(
    private superService: SuperService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private autoGenerate: AutoGeneratePasswordService,
    private toastrService:ToastrService
  ) { }

  ngOnInit(): void {
    this.modifyFormValidator();
    this.loadSuperData();
  }

  private loadSuperData(): void {
    this.getId = this.route.snapshot.paramMap.get('id');
    // this.masterId = this.route.snapshot.queryParamMap.get('masterId');
    this.superService.getSingleSuperData(this.getId).subscribe({
      next: (res: any) => {  
        console.log(res)            
        this.populateSuperForm(res.data);
        this.super =res.data;
        this.updateValidators(); // Update validators after form is populated
      }
    });
    // if (this.getId) {
    //   this.superService.getSingleMasterData(this.masterId).subscribe({
    //     next: (res: MasterContent) => {
    //       console.log(res)
    //       this.super = res;
    //       this.populatedMasterForm(res)
    //     }
    //   });
    // }
  }

  modifyFormValidator() {
    this.superUpdateForm = this.fb.group({
      code: [''],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      reference: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(60)]],
      contactNo: ['', [Validators.required, Validators.minLength(0), Validators.maxLength(11), Validators.pattern(/^[0-9]*$/)]],
      share: ['', [Validators.required, Validators.min(0)]],
      casinoShare: ['', [Validators.required, Validators.min(0)]],
      mc: ['', [Validators.required, Validators.min(0)]],
      sc: ['', [Validators.required, Validators.min(0)]],
      cc: ['', [Validators.required, Validators.min(0)]],
      casinoCheck: [true],
      shareStatus: [true],
      status: [true],
      shareMaster: [''],
      casinoShareMaster: [''],
      mcMaster: [''],
      scMaster: [''],
      ccMaster: ['']
    });
  }

  private updateValidators() {
    if (this.super) {
      this.superUpdateForm.get('share')?.setValidators([Validators.required, Validators.min(0), Validators.max(this.super.share)]);
      this.superUpdateForm.get('casinoShare')?.setValidators([Validators.required, Validators.min(0), Validators.max(this.super.casinoShare)]);
      this.superUpdateForm.get('mc')?.setValidators([Validators.required, Validators.min(0), Validators.max(this.super.mc)]);
      this.superUpdateForm.get('sc')?.setValidators([Validators.required, Validators.min(0), Validators.max(this.super.sc)]);
      this.superUpdateForm.get('cc')?.setValidators([Validators.required, Validators.min(0), Validators.max(this.super.cc)]);

      // Call this to ensure the form is updated correctly
      this.superUpdateForm.updateValueAndValidity();
    }
  }

  private populateSuperForm(data: any) {
    if (this.superUpdateForm) {
      this.superUpdateForm.patchValue({
        code: data.code,
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
        shareMaster:data.shareMaster,
        casinoShareMaster:data.casinoShareMaster,
        mcMaster:data.mcMaster,
        scMaster:data.scMaster,
        ccMaster:data.ccMaster

      });
    }
  }


  onSubmit() {
    this.submitted = true;
    if (this.superUpdateForm.valid) {
      const formData = this.superUpdateForm.value;
      this.isLoading = true;
      this.superService.updateSuper(this.getId,formData).subscribe({
        next:(res:any)=>{
            this.router.navigate(['/super']);
            this.isLoading = false;
            this.toastrService.show('Success','Data update Successfully',{ progressBar: true });

        },
        error: (err:any) => {
          console.log("Error updating data:", err);
          this.isLoading=false
          try {
           const serverError = JSON.parse(err.message);
           this.serverErrors = serverError;
         } catch (err) {
           console.error('Error parsing server error:', err);
           this.toastrService.error('An unexpected error occurred.');
         }
      }
      });
      // this.superService.updateDummySuper(this.getId, formData).subscribe({
      //   next: (res: any) => {
      //   },
      
      //   complete: () => {
      //     this.isLoading = false;
      //   }
      // });
    }
  }

  generatePassword() {
    const randomPassword = this.autoGenerate.generateRandomPassword(8);
    this.superUpdateForm?.get('password')?.setValue(randomPassword);
  }
}
