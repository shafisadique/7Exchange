import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ServerErrors } from '../../subAdmin/server-error';
import { ClientService } from '../client.service';
import { AutoGeneratePasswordService } from '../../../shared/services/auto-generate-password.service';
import { UserRole } from '../../../shared/services/role.enum';
import { AuthService } from '../../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './client-create.component.html',
  styleUrl: './client-create.component.scss'
})
export class ClientCreateComponent implements OnInit {
  clientAddForm: FormGroup;
  submitted = false;
  isLoading = false;
  isBodyLoading = true; // Initialize as loading
  shareBackendError = '';
  cShareBackendError = '';
  mobileShareBackendError = '';
  userRole: UserRole;
  code: any;
  agent: any = {}; // Ensure agent is an object to avoid undefined errors
  serverErrors: ServerErrors | null = null;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
    private router: Router,
    private authService: AuthService,
    private autoGenerate: AutoGeneratePasswordService,
    private activatedRoute: ActivatedRoute,
    private toastrService:ToastrService
  ) {
    this.userRole = this.authService.getUserRole();
  }

  ngOnInit(): void {
    this.initializeCode();
    this.loadClientData();
  }

  private initializeCode(): void {
    if (this.userRole !== UserRole.AGENT) {
      this.activatedRoute.params.subscribe(params => {
        this.code = params['id'];
      });
    } else if (this.userRole === UserRole.AGENT) {
      this.code = sessionStorage.getItem('id');
    }
  }

  private loadClientData(): void {
    if (this.code) {
      this.clientService.getSingleAgentData(this.code).subscribe({
        next: (res) => {
          console.log(res)
          this.agent = res;
          this.initFormValidator(); // Initialize the form after agent data is loaded
          this.isBodyLoading = false; // Set loading to false when data is ready
        },
        error: (e) => {
          console.error(e);
          this.isBodyLoading = false; // Stop loading even on error
        }
      });
    }
  }

  initFormValidator(): void {
    this.clientAddForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(/^[A-Za-z0-9 ]+$/)]],
      reference: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(30), Validators.pattern(/^[A-Za-z0-9 ]+$/)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(60)]],
      contactNo: ['', [Validators.minLength(0), Validators.maxLength(11), Validators.pattern(/^[0-9]*$/)]],
      mc: [this.agent.mc, [Validators.required, Validators.min(0), Validators.max(this.agent.mc)]],
      sc: [this.agent.sc, [Validators.required, Validators.min(0), Validators.max(this.agent.sc)]],
      cc: [this.agent.cc, [Validators.required, Validators.min(0), Validators.max(this.agent.cc)]],
      casinoCheck:[true],
      status:[true],
      shareAgent: [this.agent.share, [Validators.required, Validators.min(0), Validators.max(this.agent.share)]],
      casinoShareAgent:[this.agent.share],
      // cshare: [this.agent.cshare, [Validators.required, Validators.min(0), Validators.max(this.agent.cshare)]],
      mobAppCharge: [this.agent.icShare, [Validators.required, Validators.min(0), Validators.max(this.agent.icShare)]],
      mcAgent:[this.agent.mc],
      scAgent:[this.agent.sc],
      ccAgnet:[this.agent.cc]
      // mobileShare: [this.agent.mobileShare, [Validators.required, Validators.min(0), Validators.max(this.agent.mobileShare)]],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.clientAddForm.valid) {
      const formData = this.clientAddForm.value;
      console.log(formData)
      this.clientService.createClient(this.code,formData).subscribe({
        next:(res)=>{
          this.toastrService.success('client create successfully')
          this.router.navigate(['/client']);
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
  }

  generatePassword() {
    const randomPassword = this.autoGenerate.generateRandomPassword(8);
    this.clientAddForm?.get('password')?.setValue(randomPassword);
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
