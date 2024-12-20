import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ServerErrors } from '../../subAdmin/server-error';
import { SuperService } from '../super.service';
import { AutoGeneratePasswordService } from '../../../shared/services/auto-generate-password.service';
import { UserRole } from '../../../shared/services/role.enum';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../shared/services/auth.service';

@Component({
  selector: 'app-super-create',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterModule],
  templateUrl: './super-create.component.html',
  styleUrl: './super-create.component.scss'
})
export class SuperCreateComponent {
  superAddForm: FormGroup;
  submitted = false;
  isLoading = false;
  isBodyLoading:boolean = false;
  shareBackendError = '';
  cShareBackendError = '';
  mobileShareBackendError = '';
  code: any;
  userRole:UserRole;
  randomCode= Math.floor(1000 + Math.random() * 9000);
  master: any ={};
  serverErrors:any;
  constructor(  private fb: FormBuilder,
                private superService: SuperService,
                private router: Router,
                private authService:AuthService,
                private activatedRoute: ActivatedRoute,
                private autoGenerate:AutoGeneratePasswordService,
                private toastrService:ToastrService
  ) {
    this.userRole = this.authService.getUserRole();
  }

  ngOnInit(): void {
    this.initializeCode();
    this.loadSuperData();
  }

  private initializeCode(): void {
    if (this.userRole !== UserRole.MASTER) {
      this.activatedRoute.params.subscribe(params => {
        this.code = params['id'];
      });
    } else if (this.userRole === UserRole.MASTER) {
      this.code = sessionStorage.getItem('id');
    }
  }


  private loadSuperData(): void {
    if (this.code) {
      this.superService.getSingleMasterData(this.code).subscribe({
        next: (res) => {
          this.master = res;
          this.initFormValidator();
        },
        error: (e) => {
          console.error(e);
        }
      });
    }
  }
  // this.initFormValidator();
  
  initFormValidator(): void {
      this.superAddForm = this.fb.group({
          name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(/^[A-Za-z0-9 ]+$/)]],
          reference: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern("(^[A-Za-z0-9 ]+\$)")]],
          password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(60)]],
          contactNo: ['', [Validators.minLength(0), Validators.maxLength(11), Validators.pattern(/^[0-9]*$/)]],
          share: [this.master?.share, [Validators.required, Validators.min(0), Validators.max(this.master?.share)]],
          casinoShare: [this.master?.cshare, [Validators.required, Validators.min(0), Validators.max(this.master?.cshare)]],
          mc: [this.master?.mc, [Validators.required, Validators.min(0), Validators.max(this.master?.mc)]],
          sc: [this.master?.sc, [Validators.required, Validators.min(0), Validators.max(this.master?.sc)]],
          cc: [this.master?.cc, [Validators.required, Validators.min(0), Validators.max(this.master?.cc)]],
          casinoCheck:[true],
          shareStatus:[true],
          status:[true],
          shareMaster:[this.master?.share],
          casinoShareMaster:[this.master?.cshare],
          mcMaster:[this.master?.mc],
          scMaster:[this.master?.sc],
          ccMaster:[this.master?.cc],
          // icShare: [this.master?.icShare, [Validators.required, Validators.min(0), Validators.max(this.master?.icShare)]],
          // currentLimit: [this.master?.currentLimit, [Validators.required, Validators.min(0), Validators.max(this.master?.currentLimit)]],
          // icShareMaster:[this.master?.icShare],
          // cshare:[0],
          // cshareMaster:[this.master?.cshare]
      });
  }

  onSubmit() {
    this.submitted = true;
    this.isLoading = true;
    const formData = this.superAddForm.value;
      this.superService.createSuper(this.code, formData).subscribe({
        next: () => {
          this.router.navigate(['/super']);
          this.toastrService.show('Data Added Successfully');
        },
        error: (e) => {
          this.isLoading = false;
          console.error(e);
          this.handleServerError(e);
          try {
            const serverError = JSON.parse(e.message);
            this.serverErrors = serverError;
          } catch (err) {
            console.error('Error parsing server error:', err);
            this.toastrService.error('An unexpected error occurred.');
          }
        }
      });
  }
  generatePassword(){
    const randomPassword = this.autoGenerate.generateRandomPassword(8);
    this.superAddForm?.get('password')?.setValue(randomPassword);
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
