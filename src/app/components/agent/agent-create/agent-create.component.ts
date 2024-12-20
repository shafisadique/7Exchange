import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ServerErrors } from '../../subAdmin/server-error';
import { AgentService } from '../agent.service';
import { AutoGeneratePasswordService } from '../../../shared/services/auto-generate-password.service';
import { AuthService } from '../../../shared/services/auth.service';
import { UserRole } from '../../../shared/services/role.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-agent-create',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterModule],
  templateUrl: './agent-create.component.html',
  styleUrl: './agent-create.component.scss'
})
export class AgentCreateComponent {
  agentAddForm: FormGroup;
  submitted = false;
  isLoading = false;
  isBodyLoading:boolean = false;
  shareBackendError = '';
  cShareBackendError = '';
  mobileShareBackendError = '';
  code: any;
  userRole:UserRole;
  randomCode= Math.floor(1000 + Math.random() * 9000);
  super: any ={
      // contactNo:8210167414,
      // currentLimit:100,
      // share:100,
      // cshare:100,
      // icShare:100,
      // mobileShare:100,
      // mc:3,
      // sc:3,
      // cc:3
  };
  serverErrors:any;
  constructor(  private fb: FormBuilder,
                private agentService: AgentService,
                private router: Router,
                private activatedRoute: ActivatedRoute,
                private authService:AuthService,
                private toastrService:ToastrService,
                private autoGenerate:AutoGeneratePasswordService
  ) {
    this.userRole = this.authService.getUserRole();

  }

  ngOnInit(): void {
   this.initializeCode();
   this.loadAgentData();
  }
  
  private initializeCode(): void {
    if (this.userRole !== UserRole.SUPER) {
      this.activatedRoute.params.subscribe(params => {
        this.code = params['id'];
      });
    } else if (this.userRole === UserRole.SUPER) {
      this.code = sessionStorage.getItem('id');
    }
  }

  private loadAgentData(): void {
    if (this.code) {
      this.agentService.getSingleSuper(this.code).subscribe({
        next: (res) => {
          console.log(res)
          this.super = res;
          this.initFormValidator();
        },
        error: (e) => {
          console.error(e);
        }
      });
    }
  }

  initFormValidator(): void {
      this.agentAddForm = this.fb.group({
          name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(/^[A-Za-z0-9 ]+$/)]],
          reference: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern("(^[A-Za-z0-9 ]+\$)")]],
          password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(60)]],
          contactNo: ['', [Validators.minLength(0), Validators.maxLength(11), Validators.pattern(/^[0-9]*$/)]],
          share: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
          casinoShare: [0, [Validators.required, Validators.min(0), Validators.max(100)]],
          mc: [0, [Validators.required, Validators.min(0), Validators.max(2)]],
          sc: [0, [Validators.required, Validators.min(0), Validators.max(3)]],
          cc: [0, [Validators.required, Validators.min(0), Validators.max(2)]],
          mcSuper:[this.super.mc],
          scSuper:[this.super.sc],
          ccSuper:[this.super.cc],
          casinoCheck: true,
          status: true,
          shareStatus: true,
          shareSuper: [this.super.share],
          casinoShareSuper:[this.super.casinoShare],
          mobileShareSuper: [this.super.mobileShare],
        });
  }

  onSubmit() {
      this.submitted = true;
      if (this.agentAddForm.valid) {
        const formData = this.agentAddForm.value;
        console.log(formData)
        this.agentService.createAgent(this.code,formData).subscribe({
          next: (res) => {
          this.router.navigate(['/agent']);
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
      })};

        // this.agentService.createDummyData(formData);
          
          // this.agentService.createDummyData(formData)
          //     .subscribe({
          //         next: (res) => {
          //             this.isLoading = false;
          //             this.router.navigate(['/master-agent']);
          //             // this.toastService.show('Data Added Successfully', { classname: 'bg-success text-light', delay: 1000 });

          //         },
          //         error: (e) => {
          //             console.error(e)
          //             console.error(e.errors)
          //             // this.toastService.show(e.error.msg, { classname: 'bg-danger text-light', delay: 15000 });
          //             this.isLoading = false;
          //             if (e.error && e.error.errors) {
          //                 this.serverErrors = e.error.errors;
          //             }
          //         },
          //         complete: () => {
          //             this.isLoading = false;
          //             console.info('complete')
          //         }
          //     });

      }
  
  generatePassword(){
    const randomPassword = this.autoGenerate.generateRandomPassword(8);
    this.agentAddForm?.get('password')?.setValue(randomPassword);
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
