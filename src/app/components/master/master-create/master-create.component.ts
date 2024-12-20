import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MasterService } from '../master.service';
import { AutoGeneratePasswordService } from '../../../shared/services/auto-generate-password.service';
import { ToastrService } from 'ngx-toastr';
import { UserRole } from '../../../shared/services/role.enum';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-master-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './master-create.component.html',
  styleUrl: './master-create.component.scss'
})
export class MasterCreateComponent implements OnInit {
  masterAddForm: FormGroup;
  submitted = false;
  isLoading = false;
  isBodyLoading = false;
  code: any;
  userRole: UserRole;
  randomCode = Math.floor(1000 + Math.random() * 9000);
  master: any = {};
  serverErrors: any;

  constructor(
    private fb: FormBuilder,
    private masterService: MasterService,
    private router: Router,
    private autoGenerate: AutoGeneratePasswordService,
    private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.userRole = this.authService.getUserRole();
  }

  ngOnInit(): void {
    this.initializeCode();
    this.loadMasterData();
  }

  private initializeCode(): void {
    if (this.userRole !== UserRole.SUB) {
      this.activatedRoute.params.subscribe(params => {
        this.code = params['id'];
      });
    } else if (this.userRole === UserRole.SUB) {
      this.code = sessionStorage.getItem('id');
    }
  }

  private loadMasterData(): void {
    if (this.code) {
      this.masterService.geSubData(this.code).subscribe({
        next: (res) => {
          console.log(res)
          this.master = res;
          this.initFormValidator();
        },
        error: (e) => {
          console.error(e);
        }
      });
    }
  }

  generatePassword(): void {
    const randomPassword = this.autoGenerate.generateRandomPassword(8);
    this.masterAddForm?.get('password')?.setValue(randomPassword);
  }

  private initFormValidator(): void {
    this.masterAddForm = this.fb.group({
      // code: [this.randomCode],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(/^[A-Za-z0-9 ]+$/)]],
      reference: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(/^[A-Za-z0-9 ]+$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(60)]],
      contactNo: ['', [Validators.minLength(0), Validators.maxLength(11), Validators.pattern(/^[0-9]*$/)]],
      status: [true],
      share: [this.master.share, [Validators.required, Validators.min(0), Validators.max(this.master.share)]],
      casinoShare: [this.master.casinoShare, [Validators.required, Validators.min(0), Validators.max(this.master.casinoShare)]],
      mc: ['', [Validators.required, Validators.min(0), Validators.max(this.master.mc)]],
      sc: ['', [Validators.required, Validators.min(0), Validators.max(this.master.sc)]],
      cc: ['', [Validators.required, Validators.min(0), Validators.max(this.master.cc)]],
      shareSub: [this.master.share],
      casinoShareSub: [this.master.casinoShare],
      mcSub: [this.master.mc],
      scSub: [this.master.sc],
      ccSub: [this.master.cc],
      mobileShare: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      // icShareSub: [0],
      casinoCheck: [this.master.casinoCheck],
      // icCheck: [true],
      // cshare: [0],
      // cshareSub: [0]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.masterAddForm.valid && this.code) {
      this.isLoading = true;
      const formData = this.masterAddForm.value;

      this.masterService.createMasterAdmin(this.code, formData).subscribe({
        next: () => {
          this.router.navigate(['/master']);
          this.toastrService.show('Success','Data Added Successfully',{ progressBar: true });
        },
        error: (e) => {
          this.isLoading = false;
          console.error(e);
          this.handleServerError(e);
        }
      });
    }
  }

  private handleServerError(error: any): void {
    try {
      const serverError = JSON.parse(error.message);
      this.serverErrors = serverError;
    } catch (err) {
      console.error('Error parsing server error:', err);
      this.toastrService.error('An unexpected error occurred.');
    }
  }
}
