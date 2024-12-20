import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubAdminService } from '../sub-admin.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AutoGeneratePasswordService } from '../../../shared/services/auto-generate-password.service';
import { ServerErrors } from '../server-error';
import { ToastrService } from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-sub-admin-create',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterModule],
  templateUrl: './sub-admin-create.component.html',
  styleUrl: './sub-admin-create.component.scss'
})
export class SubAdminCreateComponent {
  subAdminAddForm: FormGroup;
  submitted = false;
  isLoading = false;
  isBodyLoading:boolean = false;
  shareBackendError = '';
  cShareBackendError = '';
  mobileShareBackendError = '';
  randomCode= Math.floor(1000 + Math.random() * 9000);
  private destroy$ = new Subject<void>();
  subAdmin: any ={
      contactNo:8210167414,
      currentLimit:100,
      adminShare:100,
      cshare:100,
      icShare:100,
      mobileShare:100,
      casinoShare:100,
      mc:3,
      sc:3,
      cc:3
  };
  serverErrors:any;
  constructor(  private fb: FormBuilder,
                private subAdminService: SubAdminService,
                private router: Router,
                private autoGenerate:AutoGeneratePasswordService,
                private toastrService:ToastrService
  ) { 

  }

  ngOnInit(): void {
    this.subAdminService.getAdminData().subscribe({
      next:(res:any)=>{
        console.log(res)
      }
    })

    this.initFormValidator();
  }

  initFormValidator(): void {
      this.subAdminAddForm = this.fb.group({
          name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(/^[A-Za-z0-9 ]+$/)]],
          contactNo: ['', [Validators.minLength(0), Validators.maxLength(11), Validators.pattern(/^[0-9]*$/)]],
          reference: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern("(^[A-Za-z0-9 ]+\$)")]],
          password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(60)]],
          status:[true],
          casinoCheck:[true],
          mc: [this.subAdmin.mc, [Validators.required, Validators.min(0), Validators.max(this.subAdmin.mc)]],
          sc: [this.subAdmin.sc, [Validators.required, Validators.min(0), Validators.max(this.subAdmin.sc)]],
          cc: [this.subAdmin.cc, [Validators.required, Validators.min(0), Validators.max(this.subAdmin.cc)]],
          share: [this.subAdmin.adminShare, [Validators.required, Validators.min(0), Validators.max(this.subAdmin.adminShare)]],
          casinoShare: [this.subAdmin.casinoShare, [Validators.required, Validators.min(0), Validators.max(this.subAdmin.cshare)]],
          domainId:[0],
          limitUpdate: [true],
      });
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.subAdminAddForm.valid) {
      this.isLoading = true;
      const formData = this.subAdminAddForm.value;

      this.subAdminService
        .createSubAdmin(formData)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.toastrService.success('Success', 'Data added successfully.', {
              progressBar: true,
            });
            this.router.navigate(['/sub-admin']);
          },
          error: (e) => {
            this.handleError(e);
          },
          complete: () => {
            this.isLoading = false;
          },
        });
    }
  }

  private handleError(error: any): void {
    console.error('Error:', error);
    this.isLoading = false;
    try {
      const serverError = JSON.parse(error.message);
      this.serverErrors = serverError;
    } catch (err) {
      console.error('Error parsing server error:', err);
      this.toastrService.error(
        'Error',
        'An unexpected error occurred.',
        { progressBar: true }
      );
    }
  }

  generatePassword(){
    const randomPassword = this.autoGenerate.generateRandomPassword(8);
    this.subAdminAddForm?.get('password')?.setValue(randomPassword);
  }
}
